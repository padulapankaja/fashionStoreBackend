const express = require('express');
const router = express.Router();

//import user controller
const userController = require('../controllers/user.controller');

//======================================================================================================
//===================================  GET REQUEST       ===============================================
//====================================================================================================== 

//test router
router.get('/test', userController.test);



//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 


// add user
router.post('/adduser', userController.registerUser);
//login user
router.post('/signin', userController.signIn )
router.post('/getsalt', userController.getSalt )


//export router
module.exports = router


