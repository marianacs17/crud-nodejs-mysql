const controller = {};

controller.list  = async (req,res) =>{
    req.getConnection(async(err,conn) =>{
        await conn.query('SELECT * FROM teachers', (err, teachers) => {
            if (err){
                res.json(err);
            }
            res.render('teachers', {
                data : teachers
            });
        });
    });
};

controller.save = async (req,res)=>{
    const data = req.body;
    req.getConnection(async(err,conn)=>{
        await conn.query('INSERT INTO teachers set ?', [data], (err,teachers)=>{
            res.redirect('/');
        });
    });
};

controller.edit = async(req, res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn)=>{
        await conn.query('SELECT * FROM teachers WHERE id_teachers = ?',[id], (err,teachers)=>{
            res.render('teachers_edit',{
                data: teachers[0]
            });
        });
    });
};

controller.update = async (req, res)=>{
    const {id} = req.params;
    const newTeacher = req.body.newTeacher;
    req.getConnection(async(err,conn)=>{
        await conn.query('UPDATE teachers set ? WHERE id_teachers = ?',[newTeacher, id], (err,rows)=>{
            res.redirect('/');
        });
    });
};

controller.delete = async (req,res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn) => {
        await conn.query('DELETE FROM teachers WHERE id_teachers = ?', [id], (err,rows)=>{
            res.redirect('/');
        });
    });
};

module.exports = controller;