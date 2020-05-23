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

// admin get all managers 
router.post('/g/all/man',   checkRole(["admin"]), checkAuth, adminController.getAllManagers);


// admin get all users 
router.post('/g/all/users',   checkRole(["admin"]), checkAuth, adminController.getAllUsers);
// admin get all users loging browe
router.post('/g/all/users/logins',   checkRole(["admin"]), checkAuth, adminController.getUsersBrowserDetails);
// admin get all users  time
router.post('/g/all/users/time',   checkRole(["admin"]), checkAuth, adminController.getUsersLoginTimeDetails);
// admin get all user statics 
router.post('/g/user/stat',  adminController.userStat);

// delete manager
router.post('/del/man',  adminController.removeManagers);

//admin get user registtrion from month
router.post('/g/user/months',  adminController.getUserRegistrationMonths);


router.post('/g/test' , adminController.getuserbyMonth)
router.post('/g/u/test' , adminController.newBrowserDetails)
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