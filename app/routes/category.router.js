const express = require('express');
const router = express.Router();
const multer = require('multer');
const cateogry = require('../controllers/category.controller');
const checkAuth = require('../middleware/checkauth.middleware')
const { checkRole } = require('../middleware/roleauth.middleware')

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/categories/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + "_" + file.originalname);
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
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFiler
});


//--------------------------------------------------------------------

//insert new category
router.post('/insert' , upload.single('photos') ,checkAuth, checkRole(["manager", "admin"]),  cateogry.insert );

//get all categories
router.get('/getall' , cateogry.getAll );

//update categary by id
router.patch('/update/:id' , upload.single('photos') ,checkAuth, checkRole(["manager", "admin"]), cateogry.update );

//delete category by id
router.delete('/delete/:id' ,checkAuth, checkRole(["manager", "admin"]), cateogry.delete );

module.exports = router;