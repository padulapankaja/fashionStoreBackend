const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Wishlist = new Schema({
  userid: {
    type: String,
    required: true,
  },
  product_id: {
    type: Number,
    default: 0,
  },
  pruduct_name: {
    type: String,
    required: true,
  },
  product_price: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  discount: {
    type: Number,
  },
  view_count: {
    type: Number,
    default: 0,
  },

  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("wishlists", Wishlist);
