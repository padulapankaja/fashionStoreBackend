const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
    date: {
        type: Date
    },
    amount: {
        type: String,
        required: true,
    },
    userId: {
        type: String
    },
    deliveryAddress: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('orders', Order );