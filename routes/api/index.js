const express = require('express');

// using the express router for the routes
const router = express.Router();

// route for version1 '/v1'
router.use('/v1',require('./v1'));

module.exports = router;