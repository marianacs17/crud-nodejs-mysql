const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(
	cors({
		origin: 'https://crud-nodejs-1.herokuapp.com',
	})
);

// importing routes
const studentsRoutes = require('./routes/students');
const teachersRoutes = require('./routes/teachers');
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

//middlewares
app.use(morgan('dev'));
app.use(
	myConnection(
		mysql,
		{
			host: 'slashwebmariadb.cyuazzw9rdsu.us-east-1.rds.amazonaws.com',
			user: 'nodemysql',
			password: 'nodemysql',
			database: 'nodemysql',
		},
		'single'
	)
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes
app.use('/studentsforms', studentsRoutes);
app.use('/teachersforms', teachersRoutes);
app.use('/', indexRoutes);

//-----------------------
//routes for json
//Get students
app.get('/students', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		let limit = 3; //elements per page
		let page = 1;
		let offset = 0;
		if (req.query.limit) {
			limit = req.query.limit;
		}
		if (req.query.page) {
			page = req.query.page;
		}
		offset = (page - 1) * limit;
		console.log(`connected as id ${conn.threadId}`);
		const query =
			'SELECT * from students limit ' + limit + ' OFFSET ' + offset;
		console.log(query);
		conn.query(query, (err, rows) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		});
	});
});

// Get "students" by id
app.get('/students/:id', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		conn.query(
			'SELECT * from students WHERE id = ?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
					res.send(rows);
				} else {
					console.log(err);
				}
			}
		);
	});
});

// Delete a record
app.delete('/students/del/:id', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		conn.query(
			'DELETE from students WHERE id = ?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
					res.send(
						`Student with ID: ${[req.params.id]} has been removed.`
					);
				} else {
					console.log(err);
				}
			}
		);
	});
});

// Add a record
app.post('/students/add', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		const params = req.body;
		console.log(req.body);
		conn.query('INSERT INTO students SET ?', params, (err, rows) => {
			if (!err) {
				res.send(`New student added.`);
			} else {
				console.log(err);
			}
		});
	});
});

// update a record
app.put('/students/modify/:id', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		const { id } = req.params;
		const {
			names,
			lastname1,
			lastname2,
			date_of_birth,
			address,
			phone_number,
			mothers_name,
			fathers_name,
			bloodtype,
			career,
		} = req.body;
		const newStudent = {
			names,
			lastname1,
			lastname2,
			date_of_birth,
			address,
			phone_number,
			mothers_name,
			fathers_name,
			bloodtype,
			career,
		};

		conn.query(
			'UPDATE students SET ? WHERE id = ?',
			[newStudent, id],
			(err, rows) => {
				if (!err) {
					res.send(`Modified student: ${id}.`);
				} else {
					console.log(err);
				}
			}
		);

		console.log(req.body);
	});
});

//--------------------------------------
// Get "teachers"
app.get('/teachers', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		let limit = 3; //elements per page
		let page = 1;
		let offset = 0;
		if (req.query.limit) {
			limit = req.query.limit;
		}
		if (req.query.page) {
			page = req.query.page;
		}
		offset = (page - 1) * limit;
		console.log(`connected as id ${conn.threadId}`);
		const query =
			'SELECT * from teachers limit ' + limit + ' OFFSET ' + offset;
		console.log(query);
		conn.query(query, (err, rows) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		});
	});
});

// Get "teachers" by id
app.get('/teachers/:id', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		conn.query(
			'SELECT * from teachers WHERE id = ?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
					res.send(rows);
				} else {
					console.log(err);
				}
			}
		);
	});
});

// Delete a record
app.delete('/teachers/del/:id', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		conn.query(
			'DELETE from teachers WHERE id = ?',
			[req.params.id],
			(err, rows) => {
				if (!err) {
					res.send(
						`Teacher with ID: ${[req.params.id]} has been removed.`
					);
				} else {
					console.log(err);
				}
			}
		);
	});
});

// Add a record
app.post('/teachers/add', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		const params = req.body;

		conn.query('INSERT INTO  teachers SET ?', params, (err, rows) => {
			if (!err) {
				res.send(`New teacher added.`);
			} else {
				console.log(err);
			}
		});

		console.log(req.body);
	});
});

// update a record
app.put('/teachers/modify/:id', (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		const { id } = req.params;
		const {
			names,
			lastname1,
			lastname2,
			date_of_birth,
			address,
			email,
			profession,
			languages,
			work_shift,
		} = req.body;
		const newTeacher = {
			names,
			lastname1,
			lastname2,
			date_of_birth,
			address,
			email,
			profession,
			languages,
			work_shift,
		};

		conn.query(
			'UPDATE teachers SET ? WHERE id = ?',
			[newTeacher, id],
			(err, rows) => {
				if (!err) {
					res.send(`Modified teacher: ${id}.`);
				} else {
					console.log(err);
				}
			}
		);

		console.log(req.body);
	});
});

//connection with Ariel and Mario database api
app.get('/semester/:semester_id/students',(req,res)=> {
    const URL = `https://app-flask-mysql.herokuapp.com/semesterstudent/getstudentsof/ ${req.params.id}`
    axios.get(URL)
        .then(function(response){
            console.log(response.data)
            res.send(response.data)
        })
        .catch(function(error){
            console.log(error);
            res.send(error);    
        });
})

app.get('/student/:student_id/semesters',(req,res)=> {
    const URL = `https://app-flask-mysql.herokuapp.com/semesterstudent/getsemsof/ ${req.params.id}`
    axios.get(URL)
        .then(function(response){
            console.log(response.data)
            res.send(response.data)
        })
        .catch(function(error){
            console.log(error);
            res.send(error);    
        });
})

//static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
	console.log('Server on port 3000');
});
