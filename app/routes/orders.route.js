const express = require('express');
const router = express.Router();
const Order = require('../controllers/order.controller');

//Insert order
router.post('/Insert', Order.Insert);

//get all orders
router.get('/GetAll' , Order.GetAll);

//get orders by user Id
router.get('/get/:userId', Order.GetOrdersByUserId);

//delete order by id
router.delete('/delete/:id' , Order.Delete);

module.exports = router;