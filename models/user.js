//  accessing the mongoose library
const mongoose = require('mongoose');

// making up the userschema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// compiling the schema into model
const User = mongoose.model('User',userSchema);

module.exports = User;
