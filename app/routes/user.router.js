const express = require('express');
const router = express.Router();

//import user controller
const userController = require('../controllers/user.controller');

//======================================================================================================
//===================================  GET REQUEST       ===============================================
//====================================================================================================== 

//test router
router.get('/test', userController.test);
router.get('/all', userController.getAllUsers);



//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 


// add user
router.post('/adduser', userController.registerUser);
//login user
router.post('/signin', userController.signIn )
// get salt
router.post('/getsalt', userController.getSalt )
// get last login
router.post('/getlast', userController.getLatest )
// delete
router.post('/d/r/ur', userController.deleteUser )

// reset password
router.post('/u/re/pw', userController.resetPassword)





//export router
module.exports = router


