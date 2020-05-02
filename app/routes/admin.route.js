const express = require('express');
const router = express.Router();
const multer = require('multer')
const checkAuth = require('../middleware/checkauth.middleware')
const { checkRole } = require('../middleware/roleauth.middleware')
const adminController = require('../controllers/admin.controller');

// test 
router.post('/test', checkRole(["admin"]), checkAuth, adminController.test);




//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 
// admin register
router.post('/ad/s/am',  adminController.registerSuperAdmin);

// get all registerd users
router.post('/get/users', checkRole(["admin"]), checkAuth, adminController.test);
// admin sign in
router.post('/sign',  adminController.signInAdmin);
// admin get salt
router.post('/g/salt',  adminController.getSalt);

//export router
module.exports = router






// admin user details

// {
//     "firstname": "padula",
//     "lastname": "guruge",
//     "useremail": "admin@gmail.com",
//     "password": "3e7b5eeb847c9b359284274aefa78e4be9723f2301231343966a3de12c9999de",
//     "salt":"ok9ccKo9K9FWzLCcFVCL"
// }



// requset

// {
// 	"uEmail" : "admin@gmail.com",
// 	"uPass" : "3e7b5eeb847c9b359284274aefa78e4be9723f2301231343966a3de12c9999de",
// 	"keepme" : true
// }