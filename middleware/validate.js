const validator = require('../helpers/validate');

const saveUser = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email: 'required|email',
    gender: 'required|in:male,female',
    age: 'numeric|min:3|max:100',
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
    limit_num: 'required|integer|min:1|max:10',
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