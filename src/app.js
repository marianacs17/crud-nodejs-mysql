const express = require('express');
const path = require('path');
const axios = require('axios');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());

// importing routes
const studentsRoutes = require('./routes/students');
const teachersRoutes = require('./routes/teachers');
const indexRoutes = require('./routes/index');

//settings
app.set('port', process.env.PORT || 4000);
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
app.get('/allstudents', cors(), (req, res) => {
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

// Get "students" by student_id
app.get('/students/:student_id', cors(), (req, res) => {
	const { student_id } = req.params;
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		conn.query(
			'SELECT * from students WHERE student_id = ?',
			[student_id],
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
app.delete('/students/del/:id', cors(), (req, res) => {
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
app.post('/students/add', cors(), (req, res) => {
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
app.put('/students/modify/:id', cors(), (req, res) => {
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
app.get('/teachers', cors(), (req, res) => {
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

// Get "teachers" by teacher_id
app.get('/teachers/:teacher_id', cors(), (req, res) => {
	req.getConnection((err, conn) => {
		if (err) throw err;
		console.log(`connected as id ${conn.threadId}`);

		conn.query(
			'SELECT * from teachers WHERE teacher_id = ?',
			[req.params.teacher_id],
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
app.delete('/teachers/del/:id', cors(), (req, res) => {
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
app.post('/teachers/add', cors(), (req, res) => {
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
app.put('/teachers/modify/:id', cors(), (req, res) => {
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

//-----------------------------------------------------------------------------------------------------------------

//*Traer los estudiantes con la misma calificación
app.get('/grades/:total_grade/students', cors(), (req, res) => {
	const { total_grade } = req.params;
	const URL = `https://api-nodejs-mongod.herokuapp.com/grades/total/${total_grade}`;
	const URL2 = 'https://crud-nodejs-1.herokuapp.com/allstudents?limit=30';
	const students = [];
	axios
		.get(URL)
		.then(function (response) {
			grades = response.data;
			axios.get(URL2).then(function (response) {
				items = response.data;
				for (let i = 0; i < grades.length; i++) {
					for (let j = 0; j < items.length; j++) {
						if (grades[i].student_id == items[j].student_id) {
							students.push(items[i]);
							console.log(students);
						}
					}
				}
				const relation = { total_grade, students, grades };
				res.send(relation);
			});
		})
		.catch(function (error) {
			console.log(error);
			res.send(error);
		});
});

//*Traer los profesores de una materia
app.get('/subject/:subject_name/teachers', cors(), (req, res) => {
	const { subject_name } = req.params;
	const URL = `https://api-nodejs-mongod.herokuapp.com/subjects/name/${subject_name}`;
	const URL2 = 'https://crud-nodejs-1.herokuapp.com/teachers?limit=30';
	let subjects = [];
	const allTeachers = [];
	let teachers = [];
	axios.get(URL).then(function (response) {
		subjects = response.data;
		axios.get(URL2).then(function (response) {
			items2 = response.data;
			for (let i = 0; i < subjects.length; i++) {
				for (let j = 0; j < items2.length; j++) {
					if (subjects[i].teacher_id == items2[j].teacher_id) {
						allTeachers.push(items2[j]);
					}
				}
			}
			allTeachers.forEach((c) => {
				if (!teachers.includes(c)) {
					teachers.push(c);
				}
			});

			const relation = { subject_name, subjects, teachers };
			res.send(relation);
		});
	});
});

//*Traer los alumnos de una carrera en un semestre
app.get('/semester/:semester_num/:career_code/students', cors(), (req, res) => {
	const { semester_num, career_code } = req.params;
	const URL = `https://app-flask-mysql.herokuapp.com/career/${career_code}`;
	const URL2 = `https://app-flask-mysql.herokuapp.com/semester/${semester_num}`;
	const URL3 = 'https://crud-nodejs-1.herokuapp.com/allstudents?limit=30';
	let students = [];
	const semester = [];
	axios.get(URL).then(function (response) {
		career = response.data;
		axios.get(URL2).then(function (response) {
			allSemester = response.data;

			for (let i = 0; i < allSemester.length; i++) {
				if (
					allSemester[i].career_code.toLowerCase() ==
						career_code.toLowerCase() &&
					allSemester[i].semester_num == semester_num
				) {
					semester.push(allSemester[i]);
				}
			}
			axios.get(URL3).then(function (response) {
				allStudents = response.data;
				for (let i = 0; i < allStudents.length; i++) {
					if (
						allStudents[i].semester_num == semester_num &&
						allStudents[i].career.toLowerCase() ==
							career_code.toLowerCase()
					) {
						students.push(allStudents[i]);
					}
				}
				const relation = { career, semester, students };
				res.send(relation);
			});
		});
	});
});

//*Traer los alumnos de una carrera
app.get('/career/:career_code/students', cors(), (req, res) => {
	const { career_code } = req.params;
	const URL = `https://app-flask-mysql.herokuapp.com/career/${career_code}`;
	const URL2 = 'https://crud-nodejs-1.herokuapp.com/allstudents?limit=30';
	let students = [];
	axios.get(URL).then(function (response) {
		career = response.data;
		axios.get(URL2).then(function (response) {
			allStudents = response.data;
			for (let i = 0; i < allStudents.length; i++) {
				if (
					allStudents[i].career.toLowerCase() == career_code.toLowerCase()
				) {
					students.push(allStudents[i]);
				}
			}
			const relation = { career, students };
			res.send(relation);
		});
	});
});

//static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
	console.log('Server on port 3000');
});
