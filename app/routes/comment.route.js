const express = require("express");
const router = express.Router();
const comment = require("../controllers/comment.controller");

//insert new comment
router.post("/insert", comment.Insert);

//get all comments
router.get("/getall", comment.GetAll);

//get Comment by id
router.get("/getsingle/:id", comment.GetCommentById);

//delete comment by id
router.delete("/delete/:id", comment.Delete);

module.exports = router;
