module.exports.profile = function(req,res){
    return res.send("<h1>Welcome to the Profile page</h1>");
}

module.exports.signUp = function(req,res){
    console.log(req.url);
    return res.end("<P>Hi! Please do the sign-up</P>");
}

module.exports.signIn = function(req,res){
    console.log(req.url);
    return res.end("<P>Hi! Please do the sign-In</P>");
}