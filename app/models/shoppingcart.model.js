const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    users:{
        type: Schema.ObjectId,
        ref: 'users'
    },
    product:{
        type: Schema.ObjectId,
        ref: 'products'
    },
    quantity : {
        type : Number,
        default : 1 ,
    },
    selected_size : {
        type : String,
    },
    selected_color : {
        type : String
    },
    created_at:{
        type: Date,
        default : new Date()
    },
    updated_at:{
        type: Date,
        default : new Date()
    }
})

module.exports = mongoose.model('carts', Product );
