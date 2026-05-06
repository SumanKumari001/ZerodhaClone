// routes/holdings.js
const express = require("express");
const router = express.Router();
const { HoldingsModel } = require("../model/HoldingsModel");
const wrapAsync = require("../utils/wrapAsync.js");

const holdingController = require("../controllers/holdings.js");
router.route("/")
.get(holdingController.index);


module.exports = router;