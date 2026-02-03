const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    next(error);
  }
};
