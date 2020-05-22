const express = require("express");
const router = express.Router();
const Common = require("../controllers/common.controller");

//insert new comment
router.post("/subs", Common.subscribe);
router.post("/forget", Common.forgotPassword);

router.get("/counts" , Common.counts )


module.exports = router;
