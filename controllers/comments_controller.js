const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    Post.findById(req.body.post,function(err,post){
        console.log("old post:",post);
        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err,comment){
                if(err){
                    console.log("Error in creating comments",err);
                    return;
                }
                console.log("new comment:",comment);
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    })
}

// deleting a comment
module.exports.destroy = function(req,res){
    // finding the comment to delete
    Comment.findById(req.params.id, function(err,comment){
        if (comment.user == req.user.id){

            let postId = comment.post;

            // removing the comment id from the comments array in post
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err,post){
                return res.redirect('back');
            })
        }else {
            return res.redirect('back');
        }
    })
}