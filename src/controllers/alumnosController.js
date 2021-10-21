const controller = {};

controller.list  = async (req,res) =>{
    req.getConnection(async(err,conn) =>{
        await conn.query('SELECT * FROM alumnos', (err, alumnos) => {
            if (err){
                res.json(err);
            }
            res.render('alumnos', {
                data : alumnos
            });
        });
    });
};

controller.save = async (req,res)=>{
    const data = req.body;
    req.getConnection(async(err,conn)=>{
        await conn.query('INSERT INTO alumnos set ?', [data], (err,alumnos)=>{
            res.redirect('/');
        });
    });
};

controller.edit = async(req, res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn)=>{
        await conn.query('SELECT * FROM alumnos WHERE id = ?',[id], (err,alumnos)=>{
            res.render('alumnos_edit',{
                data: alumnos[0]
            });
        });
    });
};

controller.update = (req, res)=>{
    const {id} = req.params;
    const newAlumno = req.body.newAlumno;
    req.getConnection((err,conn)=>{
        conn.query('UPDATE alumnos SET ? WHERE id = ?',[newCustomer, id], (err,rows)=>{
            res.redirect('/);')
        })
    })
}

controller.delete = async (req,res)=>{
    const {id} = req.params;
    req.getConnection(async(err,conn) => {
        await conn.query('DELETE FROM alumnos WHERE id = ?', [id], (err,alumnos)=>{
            res.redirect('/');
        });
    });
};

module.exports = controller;