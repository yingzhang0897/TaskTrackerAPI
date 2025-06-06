const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/groups');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/',
  // #swagger.tags = ['Groups']
  groupsController.getAllGroups
);

router.get('/:id',
  // #swagger.tags = ['Groups']
  groupsController.getSingleGroup
);

router.post('/',
  // #swagger.tags = ['Groups']
  isAuthenticated,
  validation.saveGroup,
  groupsController.createGroup
);

router.put('/:id',
  // #swagger.tags = ['Groups']
  isAuthenticated,
  validation.saveGroup,
  groupsController.updateGroup
);

router.delete('/:id',
  // #swagger.tags = ['Groups']
  isAuthenticated,
  groupsController.deleteGroup
);

module.exports = router;
