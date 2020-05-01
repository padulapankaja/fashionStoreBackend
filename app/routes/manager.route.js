const express = require('express');
const router = express.Router();
const multer = require('multer')
const checkAuth = require('../middleware/checkauth.middleware')
const { checkRole } = require('../middleware/roleauth.middleware')
const managerontroller = require('../controllers/manager.controller');

// test 




//======================================================================================================
//===================================  POST REQUEST       ==============================================
//====================================================================================================== 

// create manager
router.post('/ad/s/m',  managerontroller.registerManager);

// get all registerd users
router.post('/get/users', checkRole(["manager"]), checkAuth, managerontroller.test);

//export router
module.exports = router