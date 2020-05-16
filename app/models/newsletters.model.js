const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Newsletters = new Schema({
    email: {
        type: String
    },
    date: {
        type: Date,
        default :  Date.now()
    }
});
module.exports = mongoose.model('newsletters', Newsletters);
// in this 'exsample' - exsample should be collection name