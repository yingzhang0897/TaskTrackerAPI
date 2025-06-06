const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to find a user.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .collection('users')
      .findOne({ _id: userId });
    if (!result) {
      return res.status(400).json({ message: 'User not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createUser = async (req, res) => {
  const user = {
    username: req.body.name,
    email: req.body.email,
    fullName: req.body.fullName,
    role: req.body.role,
    groupId: req.body.groupId
  };

  try {
    const response = await mongodb.getDb().collection('users').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the user.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while creating the user.');
  }
};

const updateUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to update a user.');
  }
  const userId = new ObjectId(req.params.id);
  const user = {
    username: req.body.name,
    email: req.body.email,
    fullName: req.body.fullName,
    role: req.body.role,
    groupId: req.body.groupId
  };

  try {
    const response = await mongodb
      .getDb()
      .collection('users')
      .replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the user.');
  }
};

const deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid user id to delete a user.');
  }
  const userId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while deleting the user.');
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
