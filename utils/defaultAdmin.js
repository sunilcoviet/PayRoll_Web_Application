const md5 = require('md5');
const User = require("../Models/AdminModel");
const {createAccessToken, createRefreshToken}=require("./accesstoken");


const createAdmin = async () => {
    const fullname ='ADMIN';
    const username = 'admin';
    const email = 'admin@PayRoll.com';
    const userpassword = '123456';
    const role = 'Admin';
    const gender='male';


    const password = md5(userpassword);

    try {
        const adminExist = await User.findOne({ email: email });

        if (adminExist) {

            // res.status(201).json({message:"Admin Account Already Existed",UserDetails : userExist,token:token});
            console.log("Admin Account Already Existed");
        }
        else {
            const user = new User({ fullname, username, email, password, gender});
            
            const access_token = createAccessToken({ username: user.username, email: user.email, role: user.role });
            user.access_token = access_token;
            const userExist = await user.save();
            // const token = await userExist.generateAuthToken();
            if (userExist) {
                console.log("Admin Account Created");
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = createAdmin;