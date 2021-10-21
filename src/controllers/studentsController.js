const controller = {};

controller.list  = async (req,res) =>{
    req.getConnection(async(err,conn) =>{
        await conn.query('SELECT * FROM students', (err, students) => {
            if (err){
                res.json(err);
            }
            res.render('students', {
                data : students
            });
        });
    });
};

controller.save = async (req,res)=>{
    const data = req.body;
    req.getConnection(async(err,conn)=>{
        await conn.query('INSERT INTO students set ?', [data], (err,students)=>{
            res.redirect('/');
        });
    });
};

controller.edit = async(req, res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn)=>{
        await conn.query('SELECT * FROM students WHERE id = ?',[id], (err,students)=>{
            res.render('students_edit',{
                data: students[0]
            });
        });
    });
};

controller.update = (req, res)=>{
    const {id} = req.params;
    const newStudent = req.body.newStudent;
    req.getConnection((err,conn)=>{
        conn.query('UPDATE students SET ? WHERE id = ?',[newStudent, id], (err,rows)=>{
            res.redirect('/');
        })
    })
}

controller.delete = async (req,res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn) => {
        await conn.query('DELETE FROM students WHERE id = ?', [id], (err,students)=>{
            res.redirect('/');
        });
    });
};

module.exports = controller;