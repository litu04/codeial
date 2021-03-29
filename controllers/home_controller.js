const { user } = require('../config/mongoose');
const { populate } = require('../models/post');
const Post = require('../models/post');

module.exports.home = function(req,res){
    //console.log(req);
    //return res.end('<h1>Hi, How are you doing?</h1>');
    //console.log("cookies",req.cookies);
    //res.cookie('something','this');
    
    // findinding the user and populating the post of each user
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: 'home',
            p: posts
        });
    })
    
}