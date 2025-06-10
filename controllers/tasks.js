const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('tasks').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid task id to find a task.');
  }
  const taskId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .collection('tasks')
      .findOne({ _id: taskId });
    if (!result) {
      return res.status(400).json({ message: 'Task not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};


const getTaskByStatus = async (req, res) => {
  const status = req.params.status;
  if (!status) {
    return res.status(400).json('Status parameter is required.');
  }
  try {
    const result = await mongodb
      .getDb()
      .collection('tasks')
      .find({ status: status })
      .toArray();
      
    if (result.length === 0) {
      return res.status(404).json({ message: 'No goals found with the given status.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getTaskByDueDate = async (req, res) => {
  const dueDate = new Date(decodeURIComponent(req.params.dueDate));
  if (!dueDate) {
    return res.status(400).json('Due Date parameter is required.');
  }
  try {
    const result = await mongodb
      .getDb()
      .collection('tasks')
      .find({ dueDate: dueDate })
      .toArray();
      
    if (result.length === 0) {
      return res.status(404).json({ message: 'No tasks found with the given dueDate.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createTask = async (req, res) => {
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: new Date(req.body.dueDate),
    assignedTo: req.body.assignedTo,
    createdBy: req.body.createdBy,
    goalID: req.body.goalID,
    createdAt: new Date(req.body.createdAt)
  };

  try {
    const response = await mongodb.getDb().collection('tasks').insertOne(task);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the task.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while creating the task.');
  }
};

const updateTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid task id to update a task.');
  }
  const taskId = new ObjectId(req.params.id);
  const task = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    priority: req.body.priority,
    dueDate: new Date(req.body.dueDate),
    assignedTo: req.body.assignedTo,
    createdBy: req.body.createdBy,
    goalID: req.body.goalID,
    createdAt: new Date(req.body.createdAt)
  };

  try {
    const response = await mongodb
      .getDb()
      .collection('tasks')
      .replaceOne({ _id: taskId }, task);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the task.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the task.');
  }
};

const deleteTask = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid task id to delete a task.');
  }
  const taskId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('tasks').deleteOne({ _id: taskId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the task.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while deleting the task.');
  }
};

module.exports = {
  getAllTasks,
  getSingleTask,
  getTaskByStatus,
  getTaskByDueDate,
  createTask,
  updateTask,
  deleteTask
};
