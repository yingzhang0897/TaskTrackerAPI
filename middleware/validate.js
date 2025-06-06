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
    members:'sometimes|objectIdArray',
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

module.exports = {
  saveUser,
  saveGroup
};