const express = require('express');
const router = express.Router();

const tasksController = require('../controllers/tasks');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/',
  // #swagger.tags = ['Tasks']
  tasksController.getAllTasks
);

router.get('/:id',
  // #swagger.tags = ['Tasks']
  tasksController.getSingleTask
);

router.get('/:status',
  // #swagger.tags = ['Tasks']
  tasksController.getTaskByStatus
);

router.get('/:finishDate',
  // #swagger.tags = ['Tasks']
  tasksController.getTaskByfinishDate
);

router.post('/',
  // #swagger.tags = ['Tasks']
  isAuthenticated,
  validation.saveTask,
  tasksController.createTask
);

router.put('/:id',
  // #swagger.tags = ['Tasks']
  isAuthenticated,
  validation.saveTask,
  tasksController.updateTask
);

router.delete('/:id',
  // #swagger.tags = ['Tasks']
  isAuthenticated,
  tasksController.deleteTask
);

module.exports = router;
