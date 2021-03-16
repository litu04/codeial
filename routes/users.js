const express = require('express');

const router = express.Router();

// importing the users_controller
const userController = require('../controllers/users_controller');

// route for '/users/profile
router.get('/profile',userController.profile);

// route for '/users/sign-up'
router.get('/sign-up',userController.signUp);

// route for '/users/sign-in'
router.get('/sign-in',userController.signIn);

module.exports = router;