const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Admin = new Schema({
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
    created_at: {
        type: Date, default: Date.now()
    },
    type: {
        type: String,
        default: "admin"
    }

});
module.exports = mongoose.model('admin', Admin);
// in this 'exsample' - exsample should be collection name