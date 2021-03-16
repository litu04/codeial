// accessing the express module
const express = require('express');

const port = 8000

// firing up the express server
const app = express();

// accessing the express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);

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

