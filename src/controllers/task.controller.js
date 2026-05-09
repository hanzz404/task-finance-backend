const Task = require('../models/task.model');
const { suggestScheduleForTask } = require('../services/scheduler.service');

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, deadline, priority, status } = req.body;
    const task = await Task.create({ title, deadline, priority, status });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
}

async function recommendTaskSchedule(req, res, next) {
  try {
    const { deadline, priority } = req.body;
    const existingTasks = await Task.find({ status: { $ne: 'done' } }).sort({ createdAt: 1 });
    const recommendation = suggestScheduleForTask({ deadline, priority }, existingTasks);
    res.json(recommendation);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  recommendTaskSchedule,
};
