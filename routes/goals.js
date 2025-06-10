const express = require('express');
const router = express.Router();

const goalsController = require('../controllers/goals');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/',
  // #swagger.tags = ['Goals']
  goalsController.getAllGoals
);

router.get('/id/:id',
  // #swagger.tags = ['Goals']
  goalsController.getSingleGoal
);

router.get('/status/:status',
  // #swagger.tags = ['Goals']
  goalsController.getGoalByStatus
);

router.post('/',
  // #swagger.tags = ['Goals']
  isAuthenticated,
  validation.saveGoal,
  goalsController.createGoal
);

router.put('/:id',
  // #swagger.tags = ['Goals']
  isAuthenticated,
  validation.saveGoal,
  goalsController.updateGoal
);

router.delete('/:id',
  // #swagger.tags = ['Goals']
  isAuthenticated,
  goalsController.deleteGoal
);

module.exports = router;
