const Employer_Employee_Payment = require("../../Models/employee/timesheetModel");
const timesheetCtrl = {
  payments: async (req, res) => {
    const { id } = req.params;
    const { employerId, organizationId, methods } = req.body;
    switch (methods) {
      case "POST":
        try {
        //   const { fullName, firstName, surName, IRDNo, email, bankDetails } =
        //     req.body.EmployerEmployeePayments;
          const { Month, datePaid, depositToTYP, payToEmployees, alerts, givingTotal, status, depositDetails, payDetails, paymentsToEmployees } = req.body;
          // !startDate || startDate,
          if (
            !employerId ||
            !organizationId ||
            !Month ||
            !datePaid ||
            !depositToTYP ||
            !payToEmployees ||
            !alerts ||
            !givingTotal ||
            !status ||
            !depositDetails ||
            !payDetails ||
            !paymentsToEmployees
          ) {
            return res
              .status(400)
              .json({ msg: "required Details are missing for Employee Payments." });
          }

          let list = await Employer_Employee_Payment.find({},{PayNumber:1}).sort({PayNumber:-1});
          let PayNumber= list[0].PayNumber;
          PayNumber++;

        //   const verification = await Employer_Employee_Payment.findOne({ PayNumber: PayNumber });
        //   if (verification) {
        //     return res
        //       .status(400)
        //       .json({ msg: "Employee details already exist." });
        //   } else {
        //    var list = await Employee.find({},{customEmployeeId:1}).sort({customEmployeeId:-1});
        //     customEmployeeId= list[0].customEmployeeId;
        //     customEmployeeId++;
        //   }
          
          const Employer_Employee_Payment = new Employer_Employee_Payment({
            employerId,
            organizationId,
            Month,
            datePaid,
            depositToTYP,
            payToEmployees,
            alerts,
            givingTotal,
            status,
            depositDetails,
            payDetails,
            paymentsToEmployees

          });

          await Employer_Employee_Payment.save();
          res.json({
            msg: "Payment Done Successfully!",

            // access_token,
            // user: {
            //   ...newEmployee._doc,
            // },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "GET":
        try {
          const details = await Employee.findOne(
            { customEmployeeId: id },
            {
              employeeProfile: 1,
              department: 1,
              section: 1,
              job: 1,
              customEmployeeId: 1,
            }
          );

          res.json({
            msg: "Employee details !",
            details,
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }

        break;
      case "PATCH":
        try {
          const update = req.body.update;
          const details = await Employee.findOneAndUpdate(
            { customEmployeeId: id },
            update
          );
          const updates = await Employee.findOne(
            { customEmployeeId: id },
            {
              employeeProfile: 1,
              department: 1,
              section: 1,
              job: 1,
              customEmployeeId: 1,
            }
          );
          res.json({
            msg: "Contact Details !",
            ContactDetails: {
              updates,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "DELETE":
        try {
          const details = await Employee.findOneAndUpdate(
            { customEmployeeId: id },
            { deleted: true }
          );
          res.json({
            msg: " removed successfully !",
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
    }
  }
  
};

module.exports = timesheetCtrl;
