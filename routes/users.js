const express = require('express');

const router = express.Router();

const passport = require('passport');

// importing the users_controller
const userController = require('../controllers/users_controller');

// route for '/users/profile
// making the profile page accessible only when the user is signed in
router.get('/profile/:id',passport.checkAuthentication, userController.profile);
// route for '/users/profile/update
router.post('/update/:id',passport.checkAuthentication,userController.update);

// route for '/users/sign-up'
router.get('/sign-up',userController.signUp);

// route for '/users/sign-in'
router.get('/sign-in',userController.signIn);

//route for 'users/create'
router.post('/create',userController.create);

// route for '/users/create-session
// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

// route for '/users/sign-out'
router.get('/sign-out',userController.destroySession);

// route for google authentication
router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), userController.createSession);

module.exports = router;