const express = require('express');
const router = express.Router();
const multer = require('multer');
const product = require('../controllers/product.controller');


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/products/')
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

//insert new product
router.post('/insert' , upload.array('photos' , 12 ) ,  product.insert );

//get all products
router.get('/getall' , product.getAll );

//get products by category name
router.get('/get/:categoryname' , product.getByCategoryName );

//get products by id
router.get('/getsingle/:id' , product.getProductById );


module.exports = router;