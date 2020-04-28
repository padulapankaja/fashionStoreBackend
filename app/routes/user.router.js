const express = require('express');
const router = express.Router();
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/profilepic/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + file.originalname);
    }
})

const fileFiler = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept
        cb(null, true)
    } else {
        // reject
        cb(new Error('message : file not acceptable'), false)

    }

}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFiler
});

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
router.post('/signin', userController.signIn)
// get salt
router.post('/getsalt', userController.getSalt)
// get last login
router.post('/getlast', userController.getLatest)
// get spesifc user
router.post('/u/my/user', userController.getSpecifUser)
// change fname and  lanem
router.post('/u/my/uname', userController.changeUsername)

// critical functio ----------------------------------
// delete
router.post('/d/r/ur', userController.deleteUser)
// reset password
router.post('/reset/user/pw', userController.resetPassword)
// upload profile pci
router.post('/u/pp/up', upload.single('photos'), userController.uploadImage)





//export router
module.exports = router


