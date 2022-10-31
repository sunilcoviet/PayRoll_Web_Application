const mongoose = require("mongoose");

const timeSheetSchema = new mongoose.Schema({
    
employerId: {
    type: mongoose.Types.ObjectId,
    ref: "Employeer",
},

// organizationId: {
// type: mongoose.Types.ObjectId,
// ref: "Organization",
// },

organizationId: {
    type: ObjectId,
    required: true
},

Month: {
    type: Date,
    required: true
},
// PayNumber: {
//     type: String,
//     required: true
// },
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
    default: 0.00
},
status: {
    type: String,
    default: 'active'
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
        employeeName: {
            type: String,
            required: true
        },
        payDetails: {

            totalGross: {
                type: Number,
                required: [true, "Please enter the gross amount"],
                default: 0.00
            },
            nontaxable: {
                type: Number,
                required: [true, "Please enter the non taxable amount"],
                default: 0.00
            },
            afterTaxDeductions: {
                type: Number,
                required: [true, "Please enter the tax deduction amount"],
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
                required: true,
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



});
module.exports = mongoose.model("Employer_Employee_Payment", timeSheetSchema);
