const passport = require('passport');

// accessing the passport-local strategy
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// telling passport to use the local strategy
// authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',  // as this is the unique
    passReqToCallback: true
    },
    function(req,email,password,done){
        // find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                //console.log("Error in finding user----> passport");
                req.flash("error",err);
                return done(err);
            } 
            // if user is not found or password mismatch
            if(!user || user.password != password){
                //console.log("Invalid username/password");
                req.flash("Error",'Invalid username/password');
                return done(null,false); // authentication fails
            }
            // if user found
            console.log("User found:",user);
            return done(null,user); // user is passed on
        });

    }
));

// serializing the user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user----> passport");
                return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated (using this function as a middleware)
passport.checkAuthentication = function(req,res,next){

    // if the user is signed in pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

// setting the user for the views
passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the local for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;