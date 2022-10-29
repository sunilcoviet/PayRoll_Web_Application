const Organization = require("../../Models/Organization/OrganizationModel");
const organizationCtrl = {
  organization: async (req, res) => {
    const { employerId, methods } = req.body;
    switch (methods) {
      case "POST":
        try {
          const {
            adminstratorName,
            phoneNumber,
            email,
            registeredCompanyName,
            tradingCompanyName,
            sectorName,
            paymentInfo,
            prefferedPayDay,
            bankDetails,
            organizationContactDetails,
          } = req.body;
          if (
            !employerId ||
            !adminstratorName ||
            !phoneNumber ||
            !registeredCompanyName ||
            !tradingCompanyName ||
            !sectorName ||
            !email ||
            !bankDetails ||
            !paymentInfo ||
            !prefferedPayDay ||
            !organizationContactDetails
          ) {
            return res
              .status(400)
              .json({ msg: "required Details are missing to register." });
          }
          //   const response= await Organization.findOne({adminstratorName:adminstratorName,registeredCompanyName:registeredCompanyName});
          //   if(response){
          //     return res
          //     .status(400)
          //     .json({ msg: "Data is already registered." });
          //   }
          const newOrganization = new Organization({
            employerId,
            adminstratorName,
            phoneNumber,
            email,
            registeredCompanyName,
            tradingCompanyName,
            sectorName,
            paymentInfo,
            prefferedPayDay,
            bankDetails,
            organizationContactDetails,
          });

          const response = await newOrganization.save();
          // console.log(JSON.stringify(result));

          res.json({
            msg: "Registered Successfully!",
            organizationRes: {
              ...newOrganization._doc,
              employerId,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "GET":
        try {
          const { id } = req.params;
          const details = await Organization.findOne(
            { _id: id },
            {
              employerId: 1,
              adminstratorName: 1,
              phoneNumber: 1,
              email: 1,
              registeredCompanyName: 1,
              tradingCompanyName: 1,
              sectorName: 1,
              paymentInfo: 1,
              prefferedPayDay: 1,
              bankDetails: 1,
              organizationContactDetails: 1,
            }
          );
          res.json({
            msg: "Organization details !",
            OrganizationDetails: {
              details,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }

        break;
      case "PATCH":
        try {
          const { id } = req.params;
          const update = req.body;
          const response = await Organization.findOne({ _id: id });
          if (!response) {
            return res
              .status(400)
              .json({ msg: "Organization with this id does not exist." });
          }
          if (response.deleted === true) {
            return res
              .status(400)
              .json({ msg: "Organization with this id does not exist." });
          }
          const details = await Organization.findOneAndUpdate(
            { _id: id },
            {
              update,
            }
          );
          const updates = await Organization.findOne(
            { _id: id },
            {
              employerId: 1,
              adminstratorName: 1,
              phoneNumber: 1,
              email: 1,
              registeredCompanyName: 1,
              tradingCompanyName: 1,
              sectorName: 1,
              paymentInfo: 1,
              prefferedPayDay: 1,
              bankDetails: 1,
              organizationContactDetails: 1,
            }
          );
          res.json({
            msg: "Organization Details !",
            updatedOrgzDetails: {
              updates,
            },
          });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
      case "DELETE":
        try {
          const { id } = req.params;
          const details = await Organization.findByIdAndUpdate(
            {_id:id},
            {deleted:true}
          ).then((result) =>{ if(result){
            res.json({
            msg: " removed successfully !",
          });
        }});
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
        break;
    }
  },
  getOrganizations: async (req, res) => {
    try {
      const { id } = req.params;
      const details = await Organization.find({ employerId: id, deleted:false });
      res.json({
        msg: "Organization details !",
        OrganizationDetails: {
          details,
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = organizationCtrl;
