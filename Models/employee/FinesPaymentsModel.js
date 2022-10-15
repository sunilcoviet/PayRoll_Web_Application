const mongoose = require("mongoose");

const finesPaymentSchema = new mongoose.Schema({
  defaultEmployeeId: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  customEmployeeId: {
    type: mongoose.Types.employeeId,
    ref: "Employee",
  },
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
  ]
});
module.exports = mongoose.model("FinesPayment", finesPaymentSchema);
