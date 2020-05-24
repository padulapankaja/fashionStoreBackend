const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment.controller");
const checkAuth = require('../middleware/checkauth.middleware')
//insert new comment
router.post("/insert",checkAuth,  comment.Insert);

//get all comments
router.get("/GetAll", comment.GetAll);

// //get Comment by id
// router.get("/getsingle/:id", comment.GetCommentById);

//delete comment by id
router.delete("/delete/:id", checkAuth, comment.Delete);

//get comments by product id
router.get("/GetComByProId/:id", comment.GetComByProId);

module.exports = router;
