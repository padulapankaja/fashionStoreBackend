const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ForgotPassword = new Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  },
  
});

module.exports = mongoose.model("forgotpw", ForgotPassword);
