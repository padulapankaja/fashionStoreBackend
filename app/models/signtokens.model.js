const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment')


let SignInToken = new Schema({
    email: {
        type: String
    },
    token: {
        type: String
    },
    keepme: {
        type: Boolean
    },
    expireresin: {
        type: String
    },
    createdAt: {
        type: Date,
    },
    browser: {
        type: String
    }
});

module.exports = mongoose.model('tokens', SignInToken);
// in this 'exsample' - exsample should be collection name