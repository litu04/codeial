const express = require('express');

// using the express router for the routes
const router = express.Router();

router.use('/posts',require('./posts'));
router.use('/users',require('./users'));

module.exports = router;