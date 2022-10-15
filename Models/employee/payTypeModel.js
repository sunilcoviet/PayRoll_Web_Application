const mongoose = require("mongoose");

const payTypeSchema = new mongoose.Schema({
  defaultEmployeeId: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  customEmployeeId: {
    type: mongoose.Types.employeeId,
    ref: "Employee",
  },
    nrmlPaysAllowances: [
      {
        name: {
          type: String,
          description: "Please Enter Pay type / allowance / deduction",
        },
        rate: {
          type: Number,
          description: "Please Enter the rate you wanna pay",
        },
        period: {
          type: String,
          description: "Please Enter Period type hour, day, week, month, year",
        },
      },
    ],
    nonTaxablePaysAllowances: [
      {
        name: {
          type: String,
          description: "Please Enter Pay type / allowance / deduction",
        },
        rate: {
          type: Number,
          description: "Please Enter the rate you wanna pay",
        },
        period: {
          type: String,
          description: "Please Enter Period type hour, day, week, month, year",
        },
      },
    ],
});

module.exports = mongoose.model("PayType", payTypeSchema);
