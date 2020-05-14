const express = require('express');
const router = express.Router();
const cart = require('../controllers/shoppingcart.controller');

//--------------------------------------------------------------------

//insert new product to shopping cart
router.post('/insert' ,   cart.insert );

//get shoppingcart
router.get('/get/:userid' , cart.getall );

//update cart item quantity
router.patch('/update/:id' ,   cart.update );

//delete cart item
router.delete('/delete/:id' ,   cart.delete );

//clear user cart
router.delete('/clear/:userid' ,   cart.clear  );

module.exports = router;