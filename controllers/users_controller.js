// import the user schema
const User = require('../models/user');

module.exports.profile = function(req,res){
    //return res.send("<h1>Welcome to the Profile page</h1>");

    return res.render('profile',{
        title: 'profile'
    });
}

// rendering the sign-up page
module.exports.signUp = function(req,res){
    //console.log(req.url);
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign-up',{
        title: 'Sign-up'
    });
    
}

// rendering the sign-in page
module.exports.signIn = function(req,res){
    //console.log(req.url);

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign-in',{
        title: 'Sign-in'
    });
}

// getting the sign-up data
module.exports.create = function(req,res){

    console.log("password:",req.body.password);
    console.log("confirm-password:",req.body.confirm_password);

    // to check if password and confirm-password are same or not
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    // to check if the user already exist
    console.log('email:',req.body.email);
    //console.log("old-email:",email);
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user presence while signing-up",err);
            return;
        }
        console.log("********",user);
        
        // if user is not present than we will create the user
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user while signing-up",err);
                    return;
                }
                console.log("New user: ",user);
                return res.redirect('/users/sign-in');
            });
        } else{
            // if the user is already present
            return res.redirect('back');
        }
    });
}

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

// for sign out
module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}