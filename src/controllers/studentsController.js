const studentsController = {};
const express = require('express');
const app = express();

studentsController.list  = async (req,res) =>{
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

studentsController.save = async (req,res)=>{
    const data = req.body;
    req.getConnection(async(err,conn)=>{
        await conn.query('INSERT INTO students set ?', [data], (err,students)=>{
            res.redirect('/studentsforms');
        });
    });
};

studentsController.edit = async(req, res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn)=>{
        await conn.query('SELECT * FROM students WHERE id = ?',[id], (err,students)=>{
            res.render('students_edit',{
                data: students[0]
            });
            console.log(students[0]);
        });
    });
};

studentsController.update = async (req, res)=>{
    const {id} = req.params;
    const {names, lastname1, lastname2, date_of_birth, address, phone_number, mothers_name, fathers_name, bloodtype, career} = req.body;
    const newStudent = {names, lastname1, lastname2, date_of_birth, address, phone_number, mothers_name, fathers_name, bloodtype, career};
    console.log(newStudent);
    req.getConnection(async(err,conn)=>{
        await conn.query('UPDATE students set ? WHERE id = ?',[newStudent, id], (err,rows)=>{
            res.redirect('/studentsforms');
        });
    });
};

studentsController.delete = async (req,res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn) => {
        await conn.query('DELETE FROM students WHERE id = ?', [id], (err,rows)=>{
            res.redirect('/studentsforms');
        });
    });
};

///////////////////////////////



module.exports = studentsController;