require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthenticationRoutes');
const AdminRouter = require('./Routes/AdminRoutes');
const EmployeeRouter = require('./Routes/EmployeeRoutes');

const TimesheetRouter = require('./Routes/TimesheetRoutes');
const EmployerRouter = require('./Routes/EmployerRoutes');
const OrganizationRouter = require('./Routes/OrganizerRoutes');
// const SupervisorRouter = require('./Routes/SupervisorRoutes');
const createAdmin = require('./utils/defaultAdmin');
// const QueryRouter=require('./Routes/queryRoutes');

const jwt = require("jsonwebtoken");        
const md5 = require('md5');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.append('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,Access-Control-Allow-Origin');
    next();
});

//Routes
app.use('/api/auth', AuthRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/employee',EmployeeRouter);
app/use('/api/timesheet', TimesheetRouter);
app.use('/api/employer',EmployerRouter);
app.use('/api/organization',OrganizationRouter);


//mongodb URL
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    // useCreateIndex:true,
    // useFindAndModify:false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) throw err;
    console.log("Database Connected!!");
});

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

//creating server with default user.
const server = app.listen(process.env.PORT, async () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
    console.log(`server started at ${process.env.PORT}`);
    // open(URL);
    await createAdmin(); //default function to create admin
});

// module.exports.handler = serverless(app);