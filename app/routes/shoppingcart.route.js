const express = require('express');
const router = express.Router();
const cart = require('../controllers/shoppingcart.controller');
const checkAuth = require('../middleware/checkauth.middleware')

//--------------------------------------------------------------------

//insert new product to shopping cart
router.post('/insert' ,   checkAuth, cart.insert );

//get shoppingcart
router.get('/get/:userid' , cart.getall );

//update cart item quantity
router.patch('/update/:id' ,   checkAuth, cart.update );

//delete cart item
router.delete('/delete/:id' ,   checkAuth, cart.delete );

//clear user cart
router.delete('/clear/:userid' ,   checkAuth, cart.clear  );

module.exports = router;