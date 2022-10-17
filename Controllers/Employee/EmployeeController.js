const ContactDetails = require("../../Models/employee/ContactDetailsModel");
const Employee = require("../../Models/employee/EmployeeModel");
const finesAndPayments = require("../../Models/employee/FinesPaymentsModel");
const History = require("../../Models/employee/historyModel");
const PayType = require("../../Models/employee/payTypeModel");
const StandardPay = require("../../Models/employee/standardPayModel");
const employeeCtrl = {
  createEmployee: async (req, res) => {
    try {
      const { employerId, organizationId } = req.body;
      const {
        fullName,
        firstName,
        surName,
        IRDNo,
        startDate,
        email,
        bankDetails,
      } = req.body.employeeProfile;
      const { department, section, job } = req.body;
      if (
        !employerId ||
        !organizationId ||
        !fullName ||
        !firstName ||
        !surName ||
        !IRDNo ||
        !startDate ||
        !email ||
        !bankDetails
      ) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      customEmployeeId = await Employee.find((err, result) => {
        return result.length;
      });
      customEmployeeId++;
      const newEmployee = new Employee({
        employerId,
        organizationId,
        employeeProfile,
        department,
        section,
        job,
        customEmployeeId,
      });
      newEmployee.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Data Successfully posted !",
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  employeesList: async (req, res) => {
    try {
      const { employerId, organizationId } = req.body;
      if (!defaultEmployeeId || !customEmployeeId) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const list = await Employee.find(
        { employerId: employerId, organizationId: organizationId },
        { employeeProfile: 1, customEmployeeId: 1 }
      );
      res.json({
        msg: "Employees List!",
        users: {
          list,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  contactDetails: async (req, res) => {
    try {
      const {
        defaultEmployeeId,
        customEmployeeId,
        employeeCode,
        address,
        phoneNumber,
      } = req.body;
      if (!defaultEmployeeId || !customEmployeeId) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const newContact = new ContactDetails({
        defaultEmployeeId,
        customEmployeeId,
        employeeCode,
        address,
        phoneNumber,
      });
      newContact.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Data Successfully posted !",
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  finesAndPayments: async (req, res) => {
    try {
      const {
        defaultEmployeeId,
        customEmployeeId,
        ministryJusticeFine,
        personalAcntPayment,
      } = req.body;
      if (!defaultEmployeeId || !customEmployeeId) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const newfinesAndPayments = new finesAndPayments({
        defaultEmployeeId,
        customEmployeeId,
        ministryJusticeFine,
        personalAcntPayment,
      });
      newContact.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Data Successfully posted !",
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  History: async (req, res) => {
    try {
      const { defaultEmployeeId, customEmployeeId } = req.params;
      if (!defaultEmployeeId || !customEmployeeId) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const { month, payStart, payEnds, period, taxCode, net, gross } =
        req.body.history;
      if (
        !month ||
        !payStart ||
        !payEnds ||
        !period ||
        !net ||
        !gross ||
        !taxCode
      ) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      let history = req.body.history;
      const newHistory = new History({
        defaultEmployeeId,
        customEmployeeId,
        history,
      });
      newHistory.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Data Successfully posted !",
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  PayType: async (req, res) => {
    try {
      const { defaultEmployeeId, customEmployeeId } = req.params;
      const { nrmlPaysAllowances, nonTaxablePaysAllowances } = req.body;
      if (!defaultEmployeeId || !customEmployeeId) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const newPaytype = new PayType({
        defaultEmployeeId,
        customEmployeeId,
        nrmlPaysAllowances,
        nonTaxablePaysAllowances,
      });
      newPaytype.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Data Successfully posted !",
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  standardPay: async (req, res) => {
    try {
      const { defaultEmployeeId, customEmployeeId } = req.params;
      const { rate, basis, taxCode, defaultEntries, paySlips, studentloans } =
        req.body;
      if (
        !defaultEmployeeId ||
        !customEmployeeId ||
        !rate ||
        !basis ||
        !taxCode ||
        !paySlips ||
        !studentloans
      ) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const newStandardPay = new StandardPay({
        defaultEmployeeId,
        customEmployeeId,
        rate,
        basis,
        taxCode,
        defaultEntries,
        paySlips,
        studentloans,
      });
      newStandardPay.save((err, result) => {
        console.log(JSON.stringify(result));
        res.json({
          msg: "Data Successfully posted !",
        });
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = employeeCtrl;
