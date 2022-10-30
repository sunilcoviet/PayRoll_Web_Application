const mongoose = require("mongoose");

const finesPaymentSchema = new mongoose.Schema({
  defaultEmployeeId: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  customEmployeeId: {
    type :Number,
     required: true,
   },
  ministryJusticeFine: [
    {
      PhNnumber: {
        type: Number,
        required: false,
        unique: true
      },
      totalFine: { type: Number, required: false },
      rePay: { type: Number, required: false },
      createdAt:{type: Date, default: Date.now()}
    },
  ],
  personalAcntPayment: [
    {
      accountNumber: { type: Number, required: false,unique: true},
      totalPayment: { type: Number, required: false },
      paymentForPays: { type: Number, required: false },
      createdAt:{type: Date, default: Date.now()}
    },
  ],
  deleted:{type: Boolean, required: false},
});
module.exports = mongoose.model("FinesPayment", finesPaymentSchema);
