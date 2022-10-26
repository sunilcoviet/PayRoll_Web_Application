const router = require('express').Router();
const employerCtrl = require('../Controllers/Employer/EmployerController');
const auth = require('../Middleware/auth');

router.get('/list', employerCtrl.usersList);

router.get("/details/:id",auth, employerCtrl.employeerDetails);

router.post("/login", employerCtrl.login);

router.patch("/update/:id",auth, employerCtrl.employeerUpdate);

router.delete("/remove/:id", employerCtrl.employeerDelete);

module.exports = router;



