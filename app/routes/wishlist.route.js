const express = require("express");
const router = express.Router();
const wishlist = require("../controllers/wishlist.controller");

//insert new product
router.post("/insert", wishlist.Insert);

//get all products
router.get("/get/:userid", wishlist.GetAll);

//delete product by id
router.delete("/delete/:id", wishlist.Delete);

module.exports = router;
