const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGroups = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection('groups').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleGroup = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid group id to find a group.');
  }
  const groupId = new ObjectId(req.params.id);
  try {
    const result = await mongodb
      .getDb()
      .collection('groups')
      .findOne({ _id: groupId });
    if (!result) {
      return res.status(400).json({ message: 'Group not found.' });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const createGroup = async (req, res) => {
  const group = {
    name: req.body.name,
    limit_num: req.body.limit_num,
  };

  try {
    const response = await mongodb.getDb().collection('groups').insertOne(group);

    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the group.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while creating the group.');
  }
};

const updateGroup = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid group id to update a group.');
  }
  const groupId = new ObjectId(req.params.id);
  const group = {
    name: req.body.name,
    limit_num: req.body.limit_num,
  };

  try {
    const response = await mongodb
      .getDb()
      .collection('groups')
      .replaceOne({ _id: groupId }, group);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the group.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while updating the group.');
  }
};

const deleteGroup = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid group id to delete a group.');
  }
  const groupId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().collection('groups').deleteOne({ _id: groupId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the group.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'Some error occurred while deleting the group.');
  }
};

module.exports = {
  getAllGroups,
  getSingleGroup,
  createGroup,
  updateGroup,
  deleteGroup
};
