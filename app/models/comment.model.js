const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Comment = new Schema({
  userid: {
    type: String,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  produtid: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("comments", Comment);
