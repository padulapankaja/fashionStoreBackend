const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Offer = new Schema({
    title:{
        type:String,
        required : true,
    },
    subtitle:{
        type:String,
    },
    banner_image:{
        type:String,
        required : true,
    },
    product_list:{
        type: [] ,
        required : true,
    },
    discount : {
        type:Number,
        required : true,
    },
    size : {
        type:Number,
        default : 12 
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model('offers', Offer );
