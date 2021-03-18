// accessing the mongoose library
const mongoose = require('mongoose')

// connecting to the database
mongoose.connect('mongodb://localhost/codeial_development');

// acquiring the connection (checking if the connection is successful or not)
const db = mongoose.connection;

// error
db.on('error',console.error.bind(console,'Error in connecting to the database'));

// up and running (showing the success message)
db.once('open',function(){
    console.log("Successfully connected to database :: mongodb");
})

module.exports = db;