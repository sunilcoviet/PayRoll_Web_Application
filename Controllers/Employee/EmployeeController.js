const ContactDetails = require("../../Models/employee/ContactDetailsModel");
const Employee = require("../../Models/employee/EmployeeModel");
const finesAndPayments = require("../../Models/employee/FinesPaymentsModel");
const History = require("../../Models/employee/historyModel");
const PayType = require("../../Models/employee/payTypeModel");
const StandardPay = require("../../Models/employee/standardPayModel");
const employeeCtrl = {
  employee: async (req, res) => {
    const { id } = req.params;
    const { employerId, organizationId, methods } = req.body;
    switch (methods) {
      case "POST":
        try {
          const {
            fullName,
            firstName,
            surName,
            IRDNo,
            email,
            bankDetails,
          } = req.body.employeeProfile;
          const { department, section, job,employeeProfile } = req.body;
          // !startDate || startDate,
          if (
            !employerId ||
            !organizationId ||
            !fullName ||
            !firstName ||
            !surName ||
            !IRDNo ||
            !email ||
            !bankDetails
          ) {
            return res
              .status(400)
              .json({ msg: "required Details are missing to register." });
          }
          const verification = await Employee.findOne({employeeProfile:{IRDNo:IRDNo,email:email}});
            if (verification) {
              return res
              .status(400)
              .json({ msg: "Employee details already exist." });
            }else{
           var customEmployeeId =await (await Employee.find({})).length;
           customEmployeeId++
            }          
          const newEmployee = new Employee({
            employerId,
            organizationId,
            employeeProfile,
            department,
            section,
            job,
            customEmployeeId,
          });

          await newEmployee.save()
            res.json({
              msg: "Registered Successfully!",
              // access_token,
              user: {
                ...newEmployee._doc,
              },
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
              update,
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
    // if (methods === "POST") {
    //   try {
    //     const {
    //       fullName,
    //       firstName,
    //       surName,
    //       IRDNo,
    //       startDate,
    //       email,
    //       bankDetails,
    //     } = req.body.employeeProfile;
    //     const { department, section, job } = req.body;
    //     if (
    //       !employerId ||
    //       !organizationId ||
    //       !fullName ||
    //       !firstName ||
    //       !surName ||
    //       !IRDNo ||
    //       !startDate ||
    //       !email ||
    //       !bankDetails
    //     ) {
    //       return res
    //         .status(400)
    //         .json({ msg: "required Details are missing to register." });
    //     }
    //     customEmployeeId = await Employee.find((err, result) => {
    //       if (!err) {
    //         return result.length;
    //       }
    //     });
    //     customEmployeeId++;
    //     const newEmployee = new Employee({
    //       employerId,
    //       organizationId,
    //       employeeProfile,
    //       department,
    //       section,
    //       job,
    //       customEmployeeId,
    //     });
    //     newEmployee.save((err, result) => {
    //       console.log(JSON.stringify(result));
    //       res.json({
    //         msg: "Data Successfully posted !",
    //       });
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (methods === "PATCH" || methods === "UPDATE") {
    //   try {
    //     const update = req.body;
    //     const details = await Employee.findOneAndUpdate(
    //       { customEmployeeId: customEmployeeId },
    //       {
    //         update,
    //       }
    //     );
    //     const updates = await Employee.findOne(
    //       { customEmployeeId: customEmployeeId },
    //       {
    //         employeeProfile: 1,
    //         department: 1,
    //         section: 1,
    //         job: 1,
    //         customEmployeeId: 1,
    //       }
    //     );
    //     res.json({
    //       msg: "Contact Details !",
    //       ContactDetails: {
    //         updates,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (methods === "DELETE") {
    //   try {
    //     const { customEmployeeId } = req.body;
    //     const details = await Employee.findOneAndUpdate(
    //       { customEmployeeId: customEmployeeId },
    //       { deleted: true }
    //     );
    //     res.json({
    //       msg: " removed successfully !",
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (methods == "GET") {
    //   try {
    //     const {customEmployeeId}=req.body;
    //     const details = await Employee.findOne(
    //       { customEmployeeId: customEmployeeId },
    //       {
    //         employeeProfile: 1,
    //         department: 1,
    //         section: 1,
    //         job: 1,
    //         customEmployeeId: 1,
    //       }
    //     );
    //     res.json({
    //       msg: "Employee details !",
    //       ContactDetails: {
    //         details,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
  },
  employeesList: async (req, res) => {
    const {methods}=req.body;
    switch (methods) {
      case "GET":
        try {
          const {
            employerId,
            organizationId,
          } = req.body;
          if (!employerId || !organizationId) {
            return res.status(400).json({ msg: "required Details are missing." });
          }
          const list = await Employee.find(
            {
              employerId: employerId,
              organizationId: organizationId,
              deleted: false,
            },
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
        break;
    }
   
  },
  ContactDetails: async (req, res) => {
    const { id } = req.params;
 const {methods}=req.body;
    switch (methods) {
      case "POST":
        try {
          const { defaultEmployeeId, employeeCode, address, phoneNumber} =
          req.body;
        if (!defaultEmployeeId) {
          return res
            .status(400)
            .json({ msg: "required Details are missing to register." });
        }
          const newContact = new ContactDetails({
            defaultEmployeeId,
            customEmployeeId: id,
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
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "GET":
        try {
          const details = await ContactDetails.findOne(
            { customEmployeeId: id },
            {
              employeeCode: 1,
              address: 1,
              phoneNumber: 1,
            }
          );
            if(details){
              res.json({
                msg: "Contact details !",
                ContactDetails: {
                  result,
                },
              });
            }
          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }

        break;
      case "PATCH":
        try {
          const update = req.body;
          const details = await ContactDetails.findOneAndUpdate({ customEmployeeId:id },update);
          const updates = await ContactDetails.findOne(
            { customEmployeeId: id },
            { employeeCode: 1, address: 1, phoneNumber: 1 }
          );
          res.json({
            msg: "Updated Contact Details !",
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
          const details = await ContactDetails.findOneAndUpdate({
            customEmployeeId: id,
          },{deleted: true});
          res.json({
            msg: "Contact removed successfully !",
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }

        break;
    }
    // if (methods === "POST") {
    //   try {
    //     const newContact = new ContactDetails({
    //       defaultEmployeeId,
    //       customEmployeeId,
    //       employeeCode,
    //       address,
    //       phoneNumber,
    //     });
    //     newContact.save((err, result) => {
    //       console.log(JSON.stringify(result));
    //       res.json({
    //         msg: "Data Successfully posted !",
    //       });
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (methods == "GET") {
    //   try {
    //     const details = await ContactDetails.findOne(
    //       { customEmployeeId: customEmployeeId },
    //       {
    //         employeeCode: 1,
    //         address: 1,
    //         phoneNumber: 1,
    //       }
    //     );
    //     res.json({
    //       msg: "Fine details !",
    //       ContactDetails: {
    //         details,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (methods === "PATCH" || methods === "UPDATE") {
    //   try {
    //     const update = req.body;
    //     const details = await ContactDetails.findOneAndUpdate(
    //       { customEmployeeId: _Id },
    //       {
    //         update,
    //       }
    //     );
    //     const updates = await ContactDetails.findOne(
    //       { customEmployeeId: _Id },
    //       { employeeCode: 1, address: 1, phoneNumber: 1 }
    //     );
    //     res.json({
    //       msg: "Contact Details !",
    //       ContactDetails: {
    //         updates,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (methods === "DELETE") {
    //   try {
    //     const details = await ContactDetails.findOneAndDelete({
    //       customEmployeeId: customEmployeeId,
    //     });
    //     res.json({
    //       msg: "Contact removed successfully !",
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
  },
  finesAndPayments: async (req, res) => {
    const { _Id } = req.params;
    const {
      defaultEmployeeId,
      ministryJusticeFine,
      personalAcntPayment,
      methods,
    } = req.body;

    if (!defaultEmployeeId ) {
      return res
        .status(400)
        .json({ msg: "required Details are missing to register." });
    }

    switch (methods) {
      case "POST":
        try {
          const newfinesAndPayments = new finesAndPayments({
            defaultEmployeeId,
            customEmployeeId: _Id,
            ministryJusticeFine,
            personalAcntPayment,
          });
          newfinesAndPayments.save((err, result) => {
            console.log(JSON.stringify(result));
            res.json({
              msg: "Data Successfully posted !",
            });
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "GET":
        try {
          const details = await finesAndPayments.findOne(
            { customEmployeeId: _Id, delete: false },
            { ministryJusticeFine: 1, personalAcntPayment: 1 }
          );
          res.json({
            msg: "Fine details !",
            fineDetails: {
              details,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }

        break;
      case "PATCH":
        try {
          const update = req.body;
          const details = await finesAndPayments.findOneAndUpdate(
            { customEmployeeId: _Id },
            { update }
          );
          const updatedDetails = await finesAndPayments.findOne(
            { customEmployeeId: _Id },
            { ministryJusticeFine: 1, personalAcntPayment: 1 }
          );
          res.json({
            msg: "Upadted Fine details successfully !",
            UpdatedFineDetails: {
              updatedDetails,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "DELETE":
        try {
          const details = await finesAndPayments.findOneAndUpdate(
            { customEmployeeId: _Id },
            { deleted: true }
          );
          res.json({
            msg: " Fine details deleted successfully !",
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
    }
    // if (mehtod === "POST") {
    //   try {
    //     const newfinesAndPayments = new finesAndPayments({
    //       defaultEmployeeId,
    //       customEmployeeId,
    //       ministryJusticeFine,
    //       personalAcntPayment,
    //     });
    //     newfinesAndPayments.save((err, result) => {
    //       console.log(JSON.stringify(result));
    //       res.json({
    //         msg: "Data Successfully posted !",
    //       });
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
    // if (mehtod === "GET") {
    //   try {
    //     const details = await finesAndPayments.findOne(
    //       { customEmployeeId: customEmployeeId },
    //       { ministryJusticeFine: 1, personalAcntPayment: 1 }
    //     );
    //     res.json({
    //       msg: "Fine details !",
    //       fineDetails: {
    //         details,
    //       },
    //     });
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }
  },
  history: async (req, res) => {
    try {
      const { _Id} = req.params;
      const{defaultEmployeeId}=req.body;
      if (!defaultEmployeeId ) {
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
        customEmployeeId: _Id,
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
      const {  _Id } = req.params;
      const { defaultEmployeeId,nrmlPaysAllowances, nonTaxablePaysAllowances } = req.body;
      if (!defaultEmployeeId) {
        return res
          .status(400)
          .json({ msg: "required Details are missing to register." });
      }
      const newPaytype = new PayType({
        defaultEmployeeId,
        customEmployeeId: _Id,
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
      const { _Id } = req.params;
      const {
        defaultEmployeeId,
        rate,
        basis,
        taxCode,
        defaultEntries,
        paySlips,
        studentloans,
      } = req.body;
      if (
        !defaultEmployeeId ||
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
        customEmployeeId: _Id,
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
