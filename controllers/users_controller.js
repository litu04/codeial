// import the user schema
const User = require('../models/user');

const fs = require('fs');
const path = require('path');

module.exports.profile = function(req,res){
    //return res.send("<h1>Welcome to the Profile page</h1>");
    User.findById(req.params.id, function(err,user){
        return res.render('profile',{
            title: 'profile',
            profile_user: user
        });
    });
    
}

// to upadte the profile info of the user
// module.exports.update = function(req,res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id,{name: req.body.name,email: req.body.email}, function(err,user){
//             return res.redirect('back');
//         });
//     } else {
//         return res.status(401).send('unauthorized');
//     }
// }

// to upadte the profile info of the user using async await
module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){
                    console.log("****Multer error",err);
                }
                //console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    // }
                    // this is saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })
        }catch(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    } else {
        req.flash('error','Unauthorized');
        return res.status(401).send('unauthorized');
    }
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
    // showing flash message when the user sign-in
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}

// for sign out
module.exports.destroySession = function(req,res){
    req.logout();
    // showing flash message when the user sign-out
    req.flash('success','You have logged out!');
    return res.redirect('/');
}