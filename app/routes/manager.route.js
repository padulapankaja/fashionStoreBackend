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
router.post('/ad/s/m',  checkAuth, checkRole(["admin"]), managerontroller.registerManager);

// login manager

router.post('/sign', managerontroller.managerSignIn);
router.post('/g/salt', managerontroller.getSaltManager);
// get all registerd users
router.post('/get/users', checkAuth, checkRole(["manager", "admin"]), managerontroller.test);


//export router
module.exports = router