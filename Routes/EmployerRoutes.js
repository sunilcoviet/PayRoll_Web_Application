const router = require('express').Router();
const employerCtrl = require('../Controllers/Employer/EmployerController');
const  authCtrl = require('../Controllers/AuthenticationController');
const auth = require('../Middleware/auth');

router.get('/list', employerCtrl.usersList);

router.post("/reg/employer",authCtrl.register);

router.patch("/changePswrd/:id",authCtrl.changePassword)

router.get("/details/:id",auth, employerCtrl.employeerDetails);

router.post("/login", employerCtrl.login);

router.patch("/update/:id",auth, employerCtrl.employeerUpdate);

router.delete("/remove/:id", employerCtrl.employeerDelete);

module.exports = router;



