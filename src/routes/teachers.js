const express = require('express');
const router = express.Router();

const teachersController = require('../controllers/teachersController');

router.get('/', teachersController.list);
router.post('/add', teachersController.save);
router.get('/delete/:id', teachersController.delete);

router.get('/update/:id', teachersController.edit);
router.post('/update/:id', teachersController.update);

module.exports = router;