const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let User = new Schema({


    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    profilepic: {
        type: String
    },
    lastlogin: {
        type: String
    },
    gender: {
        type: String
    },
    created_at: {
        type: String
    },
    updated_at: {
        type: String
    },
    type: {
        type: String,
        default: "user"
    }
});


module.exports = mongoose.model('users', User);
// in this 'exsample' - exsample should be collection name