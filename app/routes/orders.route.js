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

//get order by id
router.get('/getOrder/:id', Order.GetOrderById);

//edit order address and shipping status
router.patch('/update/:id', Order.update);

//request delete order
router.post('/requestDelete/:id', Order.RequestDelete);

module.exports = router;