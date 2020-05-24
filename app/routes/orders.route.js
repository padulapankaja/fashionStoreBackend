const express = require('express');
const router = express.Router();
const Order = require('../controllers/order.controller');
const checkAuth = require('../middleware/checkauth.middleware')

//Insert order
router.post('/Insert',checkAuth,  Order.Insert);

//get all orders
router.get('/GetAll' , Order.GetAll);

//get orders by user Id
router.get('/get/:id', Order.GetOrdersByUserId);

//delete order by id
router.delete('/delete/:id' , checkAuth,  Order.Delete);

//get order by id
router.get('/getOrder/:id', Order.GetOrderById);

//edit order address and shipping status
router.patch('/update/:id', Order.update);

//request delete order
router.post('/requestDelete/:id', Order.RequestDelete);

module.exports = router;