const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeerId: {
    type: mongoose.Types.ObjectId,
    ref: "employeer",
  },
  organizationId: {
    type: mongoose.Types.ObjectId,
    ref: "organization",
  },
  employeeProfile: {
    fullname: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    firstname: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
    },
    surname: {
      type: String,
      required: [true, "Please Enter Your Name"],
      maxLength: [30, "Name cannot exceed 30 characters"],
      minLength: [4, "Name should have more than 4 characters"],
      unique: true,
    },
    IRDNo: {
      type: Number,
      required: [true, "Please Enter Your IRD No"],
      unique: true,
      maxLength: [10, "Name cannot exceed 10 characters"],
      minLength: [6, "Name should have more than 6 characters"],
    },
    startDate: {
      type: Date,
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
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
      match:
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
    },
  },
  standardPay: {
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
      type: String,
      description: "to show pay types & rates",
      default: "true",
    },
    studentloans: {
      type: String,
      required: [true, "Please select loans which are applicable to employee"],
    },
  },
  payTypes: {
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
  },
  leave: {
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
  },
  history: [
    {
      paysRoll: {
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
          description:
            "Wages not liable for earners levy (i.e. withholding tax)",
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
    },
  ],
  contactDetails: {
    employeeCode: { type: String, required: false },
    address: {
      unit: {
        type: String,
        required: false,
      },
      street: { type: String, required: false },
      subrub: { type: String, required: false },
      postalCode: { type: String, required: false },
    },
    phoneNumber: {
      home: { type: Number, required: false },
      mobile: { type: Number, required: false },
    },
  },
  finesAndPayments: {
    ministryJusticeFine: [
      {
        PPNnumber: {
          type: Number,
          required: false,
        },
        totalFine: { type: Number, required: false },
        rePay: { type: Number, required: false },
      },
    ],
    personalAcntPayment: [
      {
        accountNumber: { type: Number, required: false },
        totalPayment: { type: Number, required: false },
        paymentForPays: { type: Number, required: false },
      },
    ],
  },

  department: {
    type: String,
    required: [true, "Please select department"],
  },
  section: {
    type: String,
    required: [true, "Please select section"],
  },
  Job: {
    type: String,
    required: [true, "Please select Job Name/Account code"],
  },
  is_active: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
