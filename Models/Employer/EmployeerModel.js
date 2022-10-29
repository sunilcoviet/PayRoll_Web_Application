const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const employerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please Enter Your fullName"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  username: {
    type: String,
    required: [true, "Please Enter Your fullName"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  firstname: {
    type: String,
    required: [true, "Please Enter Your firstName"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  surname: {
    type: String,
    required: [true, "Please Enter Your SurName"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    match:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  idProof: {
    type: String,
    default: "",
  },
  access_token: {
    type: String,
  },
  age: {
    type: Number,
    // required: [true, "Please Enter Your Age"]
  },
  avatar: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  },
  role: {
    type: String,
    default: "Employeer",
  },
  is_active: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deleted:{type: Boolean, default: false},
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
employerSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

// userSchema.methods.comparePassword = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

// Generating Password Reset Token
employerSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("Employer", employerSchema);