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
    return res.render('user_sign-up',{
        title: 'Sign-up'
    });
    
}

// rendering the sign-in page
module.exports.signIn = function(req,res){
    //console.log(req.url);
    return res.render('user_sign-in',{
        title: 'Sign-in'
    });
}



