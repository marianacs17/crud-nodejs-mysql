const express = require('express');
const router = express.Router();

const alumnosController = require('../controllers/alumnosController');

router.get('/', alumnosController.list);
router.post('/add', alumnosController.save);
router.get('/delete/:id', alumnosController.delete);
router.get('/update/:id', alumnosController.edit);
router.post('/update/:id', alumnosController.edit);

module.exports = router;