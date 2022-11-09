const mongoose = require("mongoose");

const timeSheetSchema = new mongoose.Schema({
    
employerId: {
    type: mongoose.Types.ObjectId,
    ref: "Employeer",
},
organizationId: {
    type: Object,
    required: true
},
Month: {
    type: Date,
    required: true
},

datePaid: {
    type: Date,
    required: true
},

depositToTYP:{
    type: Number,
    required: true
},
payToEmployees:{
    type: Number,
    required: true
},
alerts: {
    type: String,
    default: ""
},
givingTotal: {
    type: Number,
    required: false,
    description: "",
    default:0
},
status: {
    type: String,
    default: "active"
},
PayNumber: {
    type: Number,
    required: [true, "Please Enter Your Payment Number"],
    unique: true
  },

depositDetails: {

    Date: {
        type: Date,
        require: true
    },
    Description: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    totalDeposit: {
        type: Number,
        required: true
    }
},
payDetails: {
    
    Date: {
        type: Date,
        require: true
    },
    Description: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    totalPay: {
        type: Number,
        required: false,
        default: 0.00
    }
},
paymentsToEmployees: [

    {
        _id: false,

        employeeID: {
            type: Object,
            required: true
        },
        customEmployeeId: {
            type: Number,
            required: true 
          },
        employeeName: {
            type: String,
            required: true
        },
        payDetails: {

            totalGross: {
                type: Number,
                required: [false, "Please enter the gross amount"],
                default: 0.00
            },
            nontaxable: {
                type: Number,
                required: [false, "Please enter the non taxable amount"],
                default: 0.00
            },
            afterTaxDeductions: {
                type: Number,
                required: [false, "Please enter the tax deduction amount"],
                default: 0.00
            },
            KsEr: {
                type: Number,
                required: false,
                description: "Kiwisaver employer contributions",
                default: 0.00,
                },
            ESCT: {
                type: Number,
                required: false,
                description: "",
                default: 0.00
            },
            employeeNet: {
                type: Number,
                required: true
            },
            pdTransfer: {
                type: Number,
                required: true
            }

        }
    }
],
is_active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false},
  createdAt: {
    type: Date,
    default: Date.now,
  },



});
module.exports = mongoose.model("TimeSheet", timeSheetSchema);
