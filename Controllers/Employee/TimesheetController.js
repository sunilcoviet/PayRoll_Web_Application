const TimeSheet = require("../../Models/employee/timesheetModel");
const timesheetCtrl = {
  payments: async (req, res) => {
    const { id } = req.params;
    let details;
    let PayNumber;
    const { employerId, organizationId, methods } = req.body;
    switch (methods) {
      case "POST":
        try {
          const { Month, datePaid, depositToTYP, payToEmployees, alerts, givingTotal, status, depositDetails, payDetails, paymentsToEmployees } = req.body;
          // !startDate || startDate,
          console.log('i am in ')
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

          let list = await TimeSheet.find({},).sort({PayNumber:-1});

          console.log('paynumber', list)
          
          
          if(list == undefined || list == ''){
            PayNumber = 1;
          }
          else {
            PayNumber= list[0].PayNumber;
            PayNumber++;

          }
          // PayNumber++;

        // let PayNumber = 1

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
          
          const newTimeSheet = new TimeSheet({
            employerId,
            organizationId,
            Month,
            datePaid,
            depositToTYP,
            payToEmployees,
            alerts,
            givingTotal,
            status,
            PayNumber,
            depositDetails,
            payDetails,
            paymentsToEmployees

          });

          await newTimeSheet.save();
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

          if(id){
            details = await TimeSheet.findOne( { _id: id } );
          }
          else { 
             
            details = await TimeSheet.find( {} );
            console.log('details ', details);
          }
          

          res.json({
            msg: "Timesheet details !",
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
