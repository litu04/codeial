const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req,res){
//     //console.log(req);
//     //return res.end('<h1>Hi, How are you doing?</h1>');
//     //console.log("cookies",req.cookies);
//     //res.cookie('something','this');
    
//     // Post.find({}).populate('user').exec(function(err, posts){
//     //     if(err){
//     //         console.log("Error in populating post and finding user",err);
//     //         return;
//     //     }
//     //     console.log("******Posts******", posts);
//     //     return res.render('home', {
//     //         title: "Codeial | Home",
//     //         p:  posts
//     //     });
//     // });
//     //finding the user and populating the post of each user
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){

//         User.find({},function(err,users){
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users: users
//             });
//         });
        
//     })
    
// }

// using async await
 module.exports.home = async function(req,res){
     try{
        //finding the user and populating the post of each user
        let posts = await Post.find({})
             .populate('user')
             .populate({
                 path: 'comments',
                 populate: {
                     path: 'user'
                 }
            });

        let users = await User.find({});

        return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users: users
        });
     } catch(err){
         console.log("Error",err);
         return;
     }
    


 }
