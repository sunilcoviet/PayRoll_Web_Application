const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  defaultEmployeeId: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  customEmployeeId: {
    type :Number,
     required: true,
   },
  history: [
    {
      month: {
        type: Date,
        require: true,
      },
      payStart: {
        type: Date,
        require: true,
      },
      payEnds: {
        type: Date,
        require: true,
      },
      period: {
        type: String,
        require: true,
      },
      taxCode: {
        type: String,
        required: [true, "Please select Tax Code"],
      },
      net: {
        type: Number,
        required: [true, "Please enter the net amount"],
        default: 0,
      },
      gross: {
        type: Number,
        required: [true, "Please enter the gross amount"],
        default: 0,
      },
      NoEl: {
        type: Number,
        required: false,
        description: "Wages not liable for earners levy (i.e. withholding tax)",
        default: 0,
      },
      PAYE: {
        type: Number,
        required: false,
        description: "",
        default: 0,
      },
      CS: {
        type: Number,
        required: false,
        description: "Child Support payments",
        default: 0,
      },
      SL: {
        type: Number,
        required: false,
        description: "Student Loan deductions",
        default: 0,
      },
      KsEe: {
        type: Number,
        required: false,
        description: "Kiwisaver employee deductions",
        default: 0,
      },
      KsEr: {
        type: Number,
        required: false,
        description: "Kiwisaver employer contributions",
        default: 0,
      },
      ESCT: {
        type: Number,
        required: false,
        description: "Employer Superannuation Contribution Tax",
        default: 0,
      },
      PG: {
        type: Number,
        required: false,
        description: "Payroll giving donated",
        default: 0,
      },
      PgCrd: {
        type: Number,
        required: false,
        description: "Payroll giving credits",
        default: 0,
      },
      Lump: {
        type: Number,
        required: false,
        description: "Lump sum payments made (i.e. bonuses)",
        default: 0,
      },
    },
  ],
});
module.exports = mongoose.model("History", historySchema);
