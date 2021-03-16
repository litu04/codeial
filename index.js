// accessing the express module
const express = require('express');

const port = 8000

// firing up the express server
const app = express();

// accessing the express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

// accessing the static files by using middleware
app.use(express.static('./assets'));

//extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up the view engine
app.set('view engine','ejs');

// accessing the views folder
app.set('views','./views');

// use express router
app.use('/',require('./routes/app'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server`);
        return
    }
    console.log(`Server is running on port: ${port}`);
})

