// accessing the express module
const express = require('express');

// firing up the express server
const app = express();

const port = 8000

// accessing the cookie library
const cookieParser = require('cookie-parser');

// accessing the express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');

// importing the db(mongoose)
const db = require('./config/mongoose');

// used for session-cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//const MongoStore = require('connect-mongo')(session);
const MongoDBStore = require('connect-mongodb-session')(session);

// to encode and analyze the parse data through middleware
app.use(express.urlencoded());

app.use(cookieParser());



// accessing the static files by using middleware
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract styles and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// setting up the view engine
app.set('view engine','ejs');

// accessing the views folder
app.set('views','./views');

// use to add a middleware which takes in that session-cookie and encrypts it

//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',
    //todo change the secret key before deployment in production
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoDBStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// use express router
app.use('/',require('./routes/app'));


app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server`);
        return
    }
    console.log(`Server is running on port: ${port}`);
})
