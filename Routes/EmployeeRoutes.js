const router = require('express').Router();
const employeeCtrl = require('../Controllers/Employee/EmployeeController');
const auth = require('../Middleware/auth');

router.get('/list', employeeCtrl.employeeList);

router.get("/details/:id",auth, employerCtrl.employeeDetails);

router.post("/add", employeeCtrl.createEmployee);

router.patch("/update/:id",auth, employeeCtrl.employeeUpdate);

router.delete("/remove/:id", employeeCtrl.employeeDelete);

module.exports = router;