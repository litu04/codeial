module.exports.home = function(req,res){
    //console.log(req);
    //return res.end('<h1>Hi, How are you doing?</h1>');

    return res.render('home',{
        title: 'home'
    });
}