const express = require('express');

// using the express router for the routes
const router = express.Router();

// importing the home_controller
const homeController = require('../controllers/home_controller');

console.log("Router loaded");

// route for '/'
router.get('/',homeController.home);

// route for the '/users'
router.use('/users',require('./users'));

// route for the '/posts'
router.use('/posts',require('./posts'));

module.exports = router;