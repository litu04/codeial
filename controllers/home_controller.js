module.exports.home = function(req,res){
    //console.log(req);
    //return res.end('<h1>Hi, How are you doing?</h1>');
    //console.log("cookies",req.cookies);
    //res.cookie('something','this');
    return res.render('home',{
        title: 'home'
    });
}