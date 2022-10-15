const employeeCtrl = {
    employeeList: async (req, res) => {

        try {
            const {employerId,organizationId}=req.body;
            const list = await Users.find({employerId: employerId,organizationId: organizationId},{employeeProfile:1,employeeId:1});
            res.json({
                msg: "Users List!",
                users: {
                    list
                },
            });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
},

}


module.exports = employeeCtrl;