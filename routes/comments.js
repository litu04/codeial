const express = require('express');

const router = express.Router();

const passport = require('passport');

// importing the comments_controller
const commentsController = require('../controllers/comments_controller');

// route for comments '/create'
router.post('/create',passport.checkAuthentication,commentsController.create);

// route for deleting comments '/destroy'
router.get('/destroy/:id',passport.checkAuthentication,commentsController.destroy);

module.exports = router;