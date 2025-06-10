const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGoals = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('goals').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleGoal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid goal id to find a goal.');
  }
  const goalId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .collection('goals')
      .findOne({ _id: goalId });
    if (!result) {
      return res.status(400).json({ message: 'Goal not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getGoalByStatus = async (req, res) => {
  const status = req.params.status;
  if (!status) {
    return res.status(400).json('Status parameter is required.');
  }
  try {
    const result = await mongodb
      .getDb()
      .collection('goals')
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

const createGoal = async (req, res) => {
  const goal = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    groupId: req.body.groupId,
    taskIds: req.body.taskIds,
    createdBy: req.body.createdBy,
    createdAt: new Date(req.body.createdAt),
    dueDate: new Date(req.body.dueDate)
  };

  try {
    const response = await mongodb.getDb().collection('goals').insertOne(goal);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the goal.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while creating the goal.');
  }
};

const updateGoal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid goal id to update a goal.');
  }
  const goalId = new ObjectId(req.params.id);
  const goal = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    groupId: req.body.groupId,
    taskIds: req.body.taskIds,
    createdBy: req.body.createdBy,
    createdAt: new Date(req.body.createdAt),
    dueDate: new Date(req.body.dueDate)
  };

  try {
    const response = await mongodb
      .getDb()
      .collection('goals')
      .replaceOne({ _id: goalId }, goal);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the goal.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the goal.');
  }
};

const deleteGoal = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid goal id to delete a goal.');
  }
  const goalId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('goals').deleteOne({ _id: goalId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the goal.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while deleting the goal.');
  }
};

module.exports = {
  getAllGoals,
  getSingleGoal,
  getGoalByStatus,
  createGoal,
  updateGoal,
  deleteGoal
};
