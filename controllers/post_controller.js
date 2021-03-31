const Post = require('../models/post');
const Comment = require('../models/comment');

// module.exports.create = function(req,res){

//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     },function(err,post){
//         if(err){
//             console.log("Error in creating post");
//             return;
//         }
//         console.log('***************',post);
//         return res.redirect('back');
//     })
// }

// using async await
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
            req.flash('success','post published!');
            console.log('***************post created:',post);
            return res.redirect('back');
    }catch(err){
        //console.log("Error",err);
        //return;
        req.flash('error',err);
        return res.redirect('back');
    }
    
}

// to delete the post
// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id, function(err,post){
//         console.log("******Post found:",post);
//         // checking authorization
//         if (post.user == req.user.id){
//             // if the post user_id matches with the request removing the post
//             post.remove();

//             Comment.deleteMany({post: req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         } else{
//             return res.redirect('back');
//         }
//     })
// }

// using async await to delete the post
module.exports.destroy = async function(req,res){
    try{
       let post = await Post.findById(req.params.id);
            console.log("******Post found:",post);
            // checking authorization
            if (post.user == req.user.id){
                // if the post user_id matches with the request removing the post
                post.remove();
                await Comment.deleteMany({post: req.params.id});
                req.flash('success','post & associated comments deleted');
                return res.redirect('back');
                
            } else{
                req.flash('error','You are not authorized to delete it');
                return res.redirect('back');
            }
    }catch(err){
        //console.log("Error",err);
        //return;
        req.flash('error',err);
        return res.redirect('back');
    }
    
}