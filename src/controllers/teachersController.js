const teachersController = {};

teachersController.list  = async (req,res) =>{
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

teachersController.save = async (req,res)=>{
    const data = req.body;
    req.getConnection(async(err,conn)=>{
        await conn.query('INSERT INTO teachers set ?', [data], (err,teachers)=>{
            res.redirect('/teachersforms');
        });
    });
};

teachersController.edit = async(req, res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn)=>{
        await conn.query('SELECT * FROM teachers WHERE id = ?',[id], (err,teachers)=>{
            res.render('teachers_edit',{
                data: teachers[0]
            });
        });
    });
};

teachersController.update = async (req, res)=>{
    const {id} = req.params;
    const newTeacher = req.body.newTeacher;
    req.getConnection(async(err,conn)=>{
        await conn.query('UPDATE teachers set ? WHERE id = ?',[newTeacher, id], (err,rows)=>{
            res.redirect('/teachersforms');
        });
    });
};

teachersController.delete = async (req,res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn) => {
        await conn.query('DELETE FROM teachers WHERE id = ?', [id], (err,rows)=>{
            res.redirect('/teachersforms');
        });
    });
};

module.exports = teachersController;