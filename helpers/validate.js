const Validator = require('validatorjs');
const mongoose = require('mongoose');

// Custom rule for array of ObjectIds
Validator.register('objectIdArray', function (value, requirement, attribute) {
  return Array.isArray(value) && value.every(id => mongoose.Types.ObjectId.isValid(id));
}, 'The :attribute must be an array of valid ObjectIds.');

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;