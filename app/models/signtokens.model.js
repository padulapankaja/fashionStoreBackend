const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let SignInToken = new Schema({
  
    
    email:{
        type:String
    },
    token:{
        type:String
    },
    createdAt:{
        type : Date,
        default : Date.now()
    },
});

module.exports = mongoose.model('tokens', SignInToken);
// in this 'exsample' - exsample should be collection name