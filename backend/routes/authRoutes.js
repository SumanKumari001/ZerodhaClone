const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();

const {
   login,
   sendOtp,
   verifyOtp,
   registerUser
} = require("../controllers/authController");

router.post("/send-otp", sendOtp);

router.post("/verify-otp", verifyOtp);

router.post("/register", registerUser);

router.post(
    "/login",
    wrapAsync(login)
);


module.exports = router;