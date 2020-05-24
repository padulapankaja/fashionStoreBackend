const express = require("express");
const router = express.Router();
const wishlist = require("../controllers/wishlist.controller");
const checkAuth = require('../middleware/checkauth.middleware')

//insert new product
router.post("/insert", checkAuth,  wishlist.Insert);

//get all products
router.get("/get/:userid", wishlist.GetAll);

//delete product by id
router.delete("/delete/:id", checkAuth, wishlist.Delete);

//clear user wishlist
router.delete("/clear/:userid",  wishlist.clear);

module.exports = router;
