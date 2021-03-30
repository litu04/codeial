const express = require('express');

const router = express.Router();

const passport = require('passport');

// importing the post_controller
const postController = require('../controllers/post_controller');

// route for posts '/create'
router.post('/create',passport.checkAuthentication,postController.create);

// route for deleting post '/destroy'
router.get('/destroy/:id',passport.checkAuthentication,postController.destroy);

module.exports = router;