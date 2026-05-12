
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ExpressError = require("../utils/ExpressError");
const  {User}  = require("../model/UserModel");

const otpStore = {};

const sendOtp = async(req,res)=>{

   const { phone } = req.body;

   const otp = Math.floor(
      100000 + Math.random() * 900000
   );

   otpStore[phone] = otp;

   console.log("OTP:", otp);

   // send sms here

   res.json({
      success:true,
      message:"OTP sent"
   });
};

const verifyOtp = async(req,res)=>{

   const { phone, otp } = req.body;

   if(otpStore[phone] == otp){

      return res.json({
         success:true,
         message:"OTP verified"
      });
   }

   res.status(400).json({
      success:false,
      message:"Invalid OTP"
   });
};




const registerUser = async(req,res)=>{

   try{

      const { name, phone, password } = req.body;
      const cleanPhone = phone.slice(-10);
      const hashedPassword =
         await bcrypt.hash(password,10);

      const user = await User.create({

         name,

         MobNo: cleanPhone,

         password: hashedPassword
      });

      res.json({
         success:true,
         user
      });

   }
   catch(err){

      console.log(err);

      res.status(500).json({
         success:false,
         message:"Server error"
      });
   }
};



const login = async (req, res) => {

    const { phone, password } = req.body;

    const user = await User.findOne({
        MobNo: phone
    });

    if (!user) {

        throw new ExpressError(
            404,
            "User not found"
        );

    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {

        throw new ExpressError(
            400,
            "Invalid password"
        );

    }

    const token = jwt.sign(
        {
            id: user._id
        },
        "secretkey",
        {
            expiresIn: "7d"
        }
    );

    res.status(200).json({

        success: true,

        message: "Login successful",

        token

    });

};


module.exports = {
   login,
   registerUser,
   sendOtp,
   verifyOtp
};