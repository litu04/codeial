const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use new strategy for google log-in
passport.use(new googleStrategy({
        clientID: '590287270856-b2ngf97d52rq8nqpq1eftrhdp8lfpitd.apps.googleusercontent.com',
        clientSecret: 'nxVStvR19V7PoHwHMKOC_lwO',
        callbackURL: 'http://localhost:8000/users/auth/google/callback'
    },

    function(accessToken, refreshToken, profile, done){

        // find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if (err){
                console.log("Error in finding user using google-oauth-strategy",err);
                return;
            }
            console.log('AT',accessToken);
            console.log("RT",refreshToken);
            console.log(profile);
            // if user found, set it as req.user
            if(user){
                return done(null,user);
            }else {
                // if user not found create a user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString("hex")
                }, function(err,user){
                    if(err){
                        console.log("Error in creating user using google-oauth-strategy",err);
                        return;
                    }
                    return done(null,user);
                });
            }
        });
    }

));

module.exports = passport;