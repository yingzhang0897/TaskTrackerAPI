const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    email: 'required|email',
    fullName: 'required|string',
    role: 'required|string',
    groupId: 'sometimes|mongoId',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveGroup = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    members: 'sometimes|objectIdArray',
    createdBy: 'required|string',
    createdAt: 'required|date'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveTask = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    status: 'required|in:To do,In Progress,Done',
    priority: 'required|in:High,Medium,Low',
    dueDate: 'required|date',
    assignedTo: 'required|string',
    createdBy: 'required|string',
    goalId: 'sometimes|mongoId',
    createdAt: 'required|date',
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveGoal = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    status: 'required|in:To do,In Progress,Done',
    groupId: 'sometimes|mongoId',
    taskIds: 'sometimes|objectIdArray',
    createdBy: 'required|string',
    createdAt: 'required|date',
    dueDate: 'required|date'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
        return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveUser,
  saveGroup,
  saveTask,
  saveGoal
};