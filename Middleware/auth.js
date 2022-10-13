const Users = require('../Models/Users');
const Doctor = require('../Models/DoctorModel');
const Moderator= require('../Models/ModeratorModel');
const Supervisor = require('../Models/SupervisorModel');
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    try {
        const token = req.header("Authorization");

        if(!token){
            return res.status(400).json({ msg: "You are not authorized" });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decoded) {
          return res.status(400).json({ msg: "You are not authorized" });
        }
        var user;
        
        if(decoded.role==="patient"){
           user  = await Users.findOne({_id: decoded.id});
        }
        else if(decoded.role==="Doctor"){
            user  = await Doctor.findOne({_id: decoded.id});
        }
        else if(decoded.role==="Moderator"){
            user  = await Moderator.findOne({_id: decoded.id});
        }
        else if(decoded.role==="Supervisor"){
            user  = await Supervisor.findOne({_id: decoded.id});
        }
        

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
};

module.exports = auth;