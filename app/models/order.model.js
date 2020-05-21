const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Order = new Schema({
  date: {
    type: Date,
  },
  amount: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  products: {
    type: [],
    required: true,
  },
  deleteRequest: {
    type: Boolean,
    default: false,
  },
  shipped: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("orders", Order);
