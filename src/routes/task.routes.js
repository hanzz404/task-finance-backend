const express = require('express');
const { getTasks, createTask, deleteTask, recommendTaskSchedule } = require('../controllers/task.controller');

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.post('/schedule', recommendTaskSchedule);
router.delete('/:id', deleteTask);

module.exports = router;
