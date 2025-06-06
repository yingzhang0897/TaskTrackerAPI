const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/',
  // #swagger.tags = ['Users']
  usersController.getAllUsers
);

router.get('/:id',
  // #swagger.tags = ['Users']
  usersController.getSingleUser
);

router.post('/',
  // #swagger.tags = ['Users']
  isAuthenticated,
  validation.saveUser,
  usersController.createUser
);

router.put('/:id',
  // #swagger.tags = ['Users']
  isAuthenticated,
  validation.saveUser,
  usersController.updateUser
);

router.delete('/:id',
  // #swagger.tags = ['Users']
  isAuthenticated,
  usersController.deleteUser
);

module.exports = router;
