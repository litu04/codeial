const express = require('express');

const router = express.Router();

const passport = require('passport');

// importing the post_controller
const postController = require('../controllers/post_controller');

// route for posts '/create'
router.post('/create',passport.checkAuthentication,postController.create);

module.exports = router;