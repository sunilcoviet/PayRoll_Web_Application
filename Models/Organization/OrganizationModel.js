const mongoose = require("mongoose");
const validator = require("validator");
const organizationSchema = new mongoose.Schema({
  employerId: {
    type: mongoose.Types.ObjectId,
    ref: "employeer",
  },
  adminstratorName: {
    type: String,
    required: [true, "Please Enter Your Adminstrator Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  phoneNumber: {
    home: { type: Number, required: false },
    mobile: { type: Number, required: true },
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
    match:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  registeredCompanyName: {
    type: String,
    required: [true, "Please Enter Your Registered company Name accrnd to IRD"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  tradingCompanyName: {
    type: String,
    required: [false, "Please Enter Your company Trading Name accrnd to IRD"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  organizationContactDetails: {
    physicaladdress: {
      unit: {
        type: String,
        required: true,
      },
      street: { type: String, required: true },
      subrub: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  sectorName: {
    type: String,
    required: [true, "Please Enter Your company sector"],
  },
  bankDetails: {
    accountHolder: {
      type: String,
      required: [true, "Please Enter Your Bank Account Holder Name"],
    },
    bank: {
      type: Number,
      required: [true, "Please Enter Your Bank Number"],
    },
    branch: {
      type: Number,
      required: [true, "Please Enter Your Bank Branch Number"],
    },
    account: {
      type: Number,
      required: [true, "Please Enter Your Bank Account Number"],
      unique: true,
    },
    suffix: {
      type: Number,
      required: [true, "Please Enter Your Bank suffix Number"],
    },
  },
  paymentInfo: {
    type: String,
    required: [
      true,
      "Please Enter Your payment info (weekly,forthnights, etc)",
    ],
  },
  prefferedPayDay: {
    type: String,
    required: [true, "Please Enter Your schedule for payments"],
  },
  deleted:{
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("Organization", organizationSchema);
