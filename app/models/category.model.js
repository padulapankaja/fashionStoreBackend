const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Category = new Schema({
    name:{
        type:String,
        required : true,
    },
    banner_title:{
        type:String,
        required : true,
    },
    banne_subtitle:{
        type:String,
    },
    banner_image:{
        type:String,
        required : true,
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model('categories', Category );
