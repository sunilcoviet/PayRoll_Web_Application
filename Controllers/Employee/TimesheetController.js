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
            details = await TimeSheet.findOne( { _id: id, deleted: false } );
          }
          else { 
             
            details = await TimeSheet.find( {deleted: false} );
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
          const update = req.body.paymentDetails;
          const details = await TimeSheet.findOneAndUpdate(
            { _id: id },
            update
          );
          const paymentsUpdate = await TimeSheet.findOne( { _id: id } );
          res.json({
            msg: "Payment Details Updated Succesfully!",
            PaymentDetails: {
              paymentsUpdate,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "DELETE":
        try {
          // const details = await TimeSheet.deleteOne(
          //   { _id: id },
          //   { deleted: true }
          // );

          const details = await TimeSheet.findOneAndUpdate(
            { _id: id },
            { deleted: true }
          );
          res.json({
            msg: " Payents Data Removed successfully !",
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
    }
  }
  
};

module.exports = timesheetCtrl;
