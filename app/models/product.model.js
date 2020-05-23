const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    name:{
        type:String,
        required : true,
    },
    price:{
        type:String,
        required : true,
    },
    description:{
        type:String,
    },
    brand:{
        type:String,
        required : true,
    },
    category_id:{
        type: String,
        required : true,
    },
    category_name :{
        type: String,
        required : true,
    },
    sizes:{
        type: [] ,
        required : true,
    },
    tags:{
        type: [] ,
        required : true,
    },
    colors:{
        type: [] ,
    },
    images:{
        type: [] ,
        required : true,
    },
    added_by:{
        type: String
    },
    view_count: {
        type : Number,
        default : 0
    },
    is_active : {
        type : Boolean,
        default : true
    },
    discount : {
        type : Number,
        default : 0
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date
    }
})

module.exports = mongoose.model('products', Product );
