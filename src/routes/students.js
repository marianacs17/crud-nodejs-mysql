const express = require('express');
const router = express.Router();

const studentsController = require('../controllers/studentsController');

router.get('/', studentsController.list);
router.post('/add', studentsController.save);
router.get('/delete/:id', studentsController.delete);

router.get('/update/:id', studentsController.edit);
router.post('/update/:id', studentsController.update);

module.exports = router;