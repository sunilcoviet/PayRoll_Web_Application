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


payStart: {
    type: Date,
    require: false,
    default: 0
},
payEnds: {
    type: Date,
    require: false,
    default: 0
},
period: {
    type: String,
    require: false,
    default: ""
},
taxCode: {
    type: String,
    required: [false, "Please select Tax Code"],
    default:""
},
NoEl: {
    type: Number,
    required: false,
    description: "Wages not liable for earners levy (i.e. withholding tax)",
    default: 0,
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
