const Admins = require("../Models/AdminModel");
const {createAccessToken,createRefreshToken}=require ("../utils/accesstoken");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const md5 = require('md5');

const adminCtrl = {
  // Enroll PAtient

  registerAdmin: async (req, res) => {
    try {
      const { fullname, username, email, password, gender,} = req.body;

      let newUserName = username.toLowerCase().replace(/ /g, "");

      const user_name = await Admins.findOne({ username: newUserName });
      if (user_name) {
        return res.status(400).json({ msg: "This username is already taken." });
      }

      const user_email = await Admins.findOne({ email });
      if (user_email) {
        return res
          .status(400)
          .json({ msg: "This email is already registered." });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long." });
      }

      const passwordHash = await md5(password);

      const newUser = new Admins({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        gender
      });

      await newUser.save();

      res.json({ msg: "Admin Registered Successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const passwordHash =await md5(password);
      const user = await Admins.findOne({ email:email,password:passwordHash});

      if (!user) {
        return res.status(400).json({ msg: "Email or Password is incorrect." });
      }

      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(400).json({ msg: "Email or Password is incorrect." });
      // }

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      user.access_token = access_token;

      await Admins.findOneAndUpdate({_id: user._id}, {access_token: access_token,is_active:true });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
      });

      res.json({
        msg: "Logged in  Successfully!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  verifyRole:async(req,res)=>{
    const {id,role}=req.params;
    var user;
    try{
      if(role===""){
        user  = await XYZ.findOneAndUpdate({_id:id},{is_verified:true}).then(()=>{
          res.json({
            msg: "verified XYZ Successfully!"
          });
        });}
       
      }catch(err){
      return res.status(500).json({ msg: err.message });
    }
    },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token) {
        return res.status(400).json({ msg: "Please login again." });
      }
      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) {
            res.status(400).json({ msg: "Please login again." });
          }

          const user = await Admins.findById(result._id);
          //   .select("-password")
          //   .populate("followers following", "-password");

          if (!user) {
            res.status(400).json({ msg: "User does not exist." });
          }

          const access_token = createAccessToken({ id: result.id });
          res.json({ access_token, user });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};


module.exports = adminCtrl;