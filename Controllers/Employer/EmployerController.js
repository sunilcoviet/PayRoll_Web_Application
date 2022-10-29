const Users = require("../../Models/Employer/EmployeerModel");
const {
  createAccessToken,
  createRefreshToken,
} = require("../../utils/accesstoken");
const md5 = require("md5");

const employerCtrl = {
  // Fetch All Patients Info
  usersList: async (req, res) => {
    try {
      const list = await Users.find(
        { delete: false },
        { deleted: 0, access_token: 0, createdAt: 0, is_active: 0, role: -1 }
      );
      if (list) {
        res.json({
          msg: "Users List!",
          users: {
            list,
          },
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = await req.body;
      const passwordHash = await md5(password);
      const user = await Users.findOne({
        email: email,
        password: passwordHash,
      });
      if (!user) {
        return res.status(400).json({ msg: "Email or Password is incorrect." });
      }
      const access_token = createAccessToken({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
      const refresh_token = createRefreshToken({
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      });
      user.access_token = access_token;
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/refresh_token",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
      });

      await Users.findOneAndUpdate(
        { _id: user._id },
        { is_active: true, access_token: access_token }
      ).then((result) => {
        res.json({
          msg: "Logged in  Successfully!",
          access_token,
          user: {
            ...user._doc,
            password: "",
          },
        });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //  Fetch the Specific/Single Employeer Info
  employeerDetails: async (req, res) => {
    const { id } = req.params;
    const { methods } = req.body;
    switch (methods) {
      case "GET":
        try {
          const userInfo = await Users.findOne({ _id: id });
          if (!userInfo) {
            return res.status(400).json({ msg: "User Data Not Found." });
          }
          res.json({
            msg: "User Details!",
            user: {
              userInfo,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;

      case "PATCH":
        // Update Employeer Info
        try {
          const update = req.body.update;
          console.log(update);
          //Validate the Employeer
          const userInfo = await Users.findOne({ _id: id });
          // console.log(JSON.stringify(userInfo));
          if (!userInfo) {
            return res.status(400).json({ msg: "Employeer Data Not Found." });
          } //Update the Employeer Data
          await Users.findOneAndUpdate({ _id: id }, update);

          const userUpdateInfo = await Users.findOne({ _id: id });
          res.json({
            msg: "Employeer Details Updated Successfully!",
            user: {
              userUpdateInfo,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }

        break;
      // Deleting Employeer Info
      case "DELETE":
        try {
          //Validate the User
          const userInfo = await Users.findOne({ _id: id });
          // console.log(userInfo);
          if (!userInfo) {
            return res.status(400).json({ msg: "Employeer Data Not Found." });
          }
          //Update the Patient Data
          await Users.findOneAndUpdate(
            { _id: userInfo._id },
            { deleted: true }
          );
          res.json({
            msg: "Employeer Deleted Successfully!",
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
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

          const user = await Users.findById(result._id);
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

module.exports = employerCtrl;
