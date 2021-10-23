const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'https://crud-nodejs-1.herokuapp.com'
}))

// importing routes
const studentsRoutes = require('./routes/students');
const teachersRoutes = require('./routes/teachers');
const indexRoutes = require('./routes/index');
const { urlencoded } = require('express');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

//middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'slashwebmariadb.cyuazzw9rdsu.us-east-1.rds.amazonaws.com',
    user: 'nodemysql',
    password: 'nodemysql',
    database: 'nodemysql'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//routes
app.use('/studentsforms', studentsRoutes);
app.use('/teachersforms', teachersRoutes);
app.use('/', indexRoutes);


//-----------------------
//routes for json
//Get students
app.get('/students', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)
        const limit = 5;
        const page = req.query.page;
        const offset = (page - 1)*limit;
        conn.query('SELECT * from students limit'+limit+'OFFSET'+offset, (err, rows) => {

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})

// Get "students" by id
app.get('/students/:id', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        conn.query('SELECT * from students WHERE id = ?', [req.params.id], (err, rows) => {

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Delete a record
app.delete('/students/del/:id', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        conn.query('DELETE from students WHERE id = ?', [req.params.id], (err, rows) => {

            if(!err) {
                res.send(`Student with ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})


// Add a record
app.post('/students/add', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        const params = req.body

        conn.query('INSERT INTO  students SET ?', params, (err, rows) => {

            if(!err) {
                res.send(`New student added.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


// update a record
app.put('/students/modify', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        const {id, names} = req.body

        conn.query('UPDATE students SET names = ? WHERE id = ?', [names, id], (err, rows) => {

            if(!err) {
                res.send(`Modified student: ${names}.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//--------------------------------------
// Get "teachers"
app.get('/teachers', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        conn.query('SELECT * from teachers', (err, rows) => {

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Get "teachers" by id
app.get('/teachers/:id', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        conn.query('SELECT * from teachers WHERE id = ?', [req.params.id], (err, rows) => {

            if(!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
        })
    })
})


// Delete a record
app.delete('/teachers/del/:id', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        conn.query('DELETE from teachers WHERE id = ?', [req.params.id], (err, rows) => {

            if(!err) {
                res.send(`Teacher with ID: ${[req.params.id]} has been removed.`)
            } else {
                console.log(err)
            }
        })
    })
})


// Add a record
app.post('/teachers/add', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        const params = req.body

        conn.query('INSERT INTO  teachers SET ?', params, (err, rows) => {

            if(!err) {
                res.send(`New teacher added.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


// update a record
app.put('/teachers/modify', (req, res) => {

    req.getConnection((err, conn) => {
        if(err) throw err
        console.log(`connected as id ${conn.threadId}`)

        const {id, names} = req.body

        conn.query('UPDATE teachers SET names = ? WHERE id = ?', [names, id], (err, rows) => {

            if(!err) {
                res.send(`Modified teacher: ${names}.`)
            } else {
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


//static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port 3000');
});