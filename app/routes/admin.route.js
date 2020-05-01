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

//export router
module.exports = router