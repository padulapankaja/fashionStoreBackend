const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Wishlist = new Schema({
  userid: {
    type: String,
    required: true,
  },
  product_id: {
    type: Schema.ObjectId,
    ref: "products",
  },

  product_price: {
    type: String,
  },

  image: {
    type: String,
  },
  is_active: {
    type: Boolean,
    default: true,
  },

  created_at: {
    type: Date,
  },
});

module.exports = mongoose.model("wishlists", Wishlist);
