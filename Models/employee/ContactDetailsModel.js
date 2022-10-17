const mongoose = require("mongoose");

const contactDetailsSchema = new mongoose.Schema({
  defaultEmployeeId: {
    type: mongoose.Types.ObjectId,
    ref: "Employee",
  },
  customEmployeeId: {
    type: mongoose.Types.employeeId,
    ref: "Employee",
  },
  defaultEmployerId: {
    type: mongoose.Types.ObjectId,
    ref: "Employer",
  },
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
});
module.exports = mongoose.model("ContactDetails", contactDetailsSchema);
