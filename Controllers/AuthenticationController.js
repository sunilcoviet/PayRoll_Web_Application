const Employer = require("../Models/Employer/EmployeerModel");
const Admins = require("../Models/AdminModel");
// const Moderator = require(+"../Models/ModeratorModel");
// const Supervisor = require("../Models/SupervisorModel");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");

const md5 = require("md5");
const {
  createAccessToken,
  createRefreshToken,
} = require("../utils/accesstoken");

const authCtrl = {
  // Enroll PAtient
  register: async (req, res) => {
    try {
      const {
        fullname,
        firstname,
        surname,
        email,
        password,
        idProof,
        age,
      } = req.body;

      let newUserName = fullname.toLowerCase().replace(/ /g, "");

      const user_name = await Employer.findOne({ username: newUserName });
      if (user_name) {
        return res.status(400).json({ msg: "username is already taken." });
      }
      const user_email = await Employer.findOne({ email });
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

      const newEmployer = new Employer({
        fullname,
        username: newUserName,
        email,
        password: passwordHash,
        firstname,
        surname,
        idProof,
        age,
      });

      const access_token = createAccessToken({
        id: newEmployer._id,
        username: newEmployer.username,
        email: newEmployer.email,
        role: newEmployer.role,
      });
      const refresh_token = createRefreshToken({
        id: newEmployer._id,
        username: newEmployer.username,
        email: newEmployer.email,
        role: newEmployer.role,
      });

      newEmployer.access_token = access_token;

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
      });

      await newEmployer.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Registered Successfully!",
          access_token,
          user: {
            ...newEmployer._doc,
            password: " ",
          },
        });
        // res.json({ msg: "registered" });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const {_id}=req.params;
      const user = await Employer.findOne({ _id:_id });

      if (md5(oldPassword) !== user.password) {
        return res.status(400).json({ msg: "Your password is wrong." });
      }

      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ msg: "Password must be at least 6 characters long." });
      }

      const newPasswordHash = md5(newPassword);

      await Employer.findOneAndUpdate(
        { _id:user._id },
        { password: newPasswordHash }
      );

      res.json({ msg: "Password updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // registerAdmin: async (req, res) => {
  //   try {
  //     const { fullname, username, email, password, gender, role } = req.body;

  //     let newUserName = username.toLowerCase().replace(/ /g, "");

  //     const user_name = await Users.findOne({ username: newUserName });
  //     if (user_name) {
  //       return res.status(400).json({ msg: "This username is already taken." });
  //     }

  //     const user_email = await Users.findOne({ email });
  //     if (user_email) {
  //       return res
  //         .status(400)
  //         .json({ msg: "This email is already registered." });
  //     }

  //     if (password.length < 6) {
  //       return res
  //         .status(400)
  //         .json({ msg: "Password must be at least 6 characters long." });
  //     }

  //     const passwordHash = await md5(password);

  //     const newUser = new Users({
  //       fullname,
  //       username: newUserName,
  //       email,
  //       password: passwordHash,
  //       gender,
  //       role
  //     });

  //     await newUser.save();

  //     res.json({ msg: "Admin Registered Successfully." });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },

  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const passwordHash = await md5(password);
      const user = await Admins.findOne({
        email: email,
        password: passwordHash,
      });

      if (!user) {
        return res.status(400).json({ msg: "Email or Password is incorrect." });
      }

      // const isMatch = await bcrypt.compare(password, user.password);
      // if (!isMatch) {
      //   return res.status(400).json({ msg: "Email or Password is incorrect." });
      // }

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

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

  logout: async (req, res) => {
    try {
      const token = req.header("Authorization");
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      var logoutuser;

      if (decoded.role === "Employer") {
        logoutuser = await Employer.findOneAndUpdate(
          { _id: decoded.id },
          { is_active: false }
        );
      } else if (decoded.role === "Admin") {
        logoutuser = await Admin.findOneAndUpdate(
          { _id: decoded.id },
          { is_active: false }
        );
      } 
      res.clearCookie("refreshtoken", { path: "/api/refresh_token" });
      return res.json({ msg: "Logged out Successfully." });
    } catch (err) {
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

          const user = await Employer.findById(result._id);
 
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

module.exports = authCtrl;
