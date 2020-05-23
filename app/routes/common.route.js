const express = require("express");
const router = express.Router();
const Common = require("../controllers/common.controller");

//insert new comment
router.post("/subs", Common.subscribe);
router.post("/forget", Common.forgotPassword);

router.get("/counts" , Common.counts )
router.get("/revenue" , Common.revenue )
router.get("/latestcomments/:limit" , Common.latest_comments )

module.exports = router;
