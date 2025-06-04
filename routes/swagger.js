const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

router.use('/api-docs', swaggerUi.serve);

module.exports = router;