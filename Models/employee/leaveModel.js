const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({
    defaultEmployeeId: {
        type: mongoose.Types.ObjectId,
        ref: "Employee",
      },
      customEmployeeId: {
        type: mongoose.Types.employeeId,
        ref: "Employee",
      },
      lastLeave: {
        type: Date,
        description: "Last Leave taken by employee",
        required: false,
        default: "",
      },
      limitSickLeaveBala: {
        type: Number,
        description: "Set a sick leave balance in days (optional)",
        required: false,
        default: "",
      },
      leavesPerYear: {
        type: Number,
        description: "Number of Days sick leave available per year",
        required: false,
        default: 10,
      },
      maxBalance: {
        type: Number,
        description: "maximum days to balance leaves ",
        required: false,
        default: 20,
      },
      carryOverLeaves: {
        type: Number,
        description: "maximum days to leaves carry over to next year",
        required: false,
        default: 10,
      },
      leaveBalance: {
        type: Boolean,
        description: "show leave balance on the payslips",
        required: false,
        default: false,
      },
      sickLeaveBalance: {
        type: Boolean,
        description: "show Sick leave balance on the payslips",
        required: false,
        default: false,
      },
    });

    module.exports = mongoose.model("Leave", leaveSchema);
    