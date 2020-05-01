const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Manager = new Schema({
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
    gender: {
        type: String
    },
    cn: {
        type: String
    },
    adminId: {
        type: String

    },
    created_at: {
         type: Date, default: Date.now()
    },
    type: {
        type: String,
        default: "manager"
    }

});
module.exports = mongoose.model('manager', Manager);
// in this 'exsample' - exsample should be collection name