const express = require('express');
const router = express.Router();
const multer = require('multer');
const offer = require('../controllers/offer.controller');


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/offers/')
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

//insert new offer
router.post('/insert' , upload.single('photos') ,  offer.insert );

//get all categories
router.get('/getall' , offer.getAll );


//delete category by id
router.delete('/delete/:id' , offer.delete );

module.exports = router;