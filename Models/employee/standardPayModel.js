const mongoose = require("mongoose");

const standardPaySchema = new mongoose.Schema({
    defaultEmployeeId: {
        type: mongoose.Types.ObjectId,
        ref: "Employee",
      },
      customEmployeeId: {
        type :Number,
        required: true,
       },
    rate: {
        type: Number,
        required: true,
      },
      basis: {
        type: String,
        required: [
          true,
          "Please select on which Basis you wanna pay to employee",
        ],
        default: "per hour",
      },
      taxCode: {
        type: String,
        required: [true, "Please select Tax Code"],
      },
  
      defaultEntries: {
        type: String,
        description: "to set default standard Pay row in timesheets",
        default: "thrusday, friday",
      },
      paySlips: {
        type: Boolean,
        description: "to show pay types & rates",
        default: "true",
      },
      studentloans: {
        type: String,
        required: [true, "Please select loans which are applicable to employee"],
      },
});
module.exports = mongoose.model("StandardPay", standardPaySchema);