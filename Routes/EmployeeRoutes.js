const router = require('express').Router();
const employeeCtrl = require('../Controllers/Employee/EmployeeController');
const auth = require('../Middleware/auth');

router.get('/list', employeeCtrl.employeesList);

router.post("/add/employee",auth, employeeCtrl.employee);
router.get("/:id/employee",auth, employeeCtrl.employee);
router.patch("/update/:id/",auth, employeeCtrl.employee);
router.delete("/remove/:id", employeeCtrl.employee);

router.post("/add/CD/:id",auth, employeeCtrl.ContactDetails);
router.get("/:id/CD",auth,employeeCtrl.ContactDetails);
router.patch("/Up/:id/CD",auth,employeeCtrl.ContactDetails);
router.delete("/remove/:id/CD",auth,employeeCtrl.ContactDetails);

router.post("/add/FP/:id",auth, employeeCtrl.finesAndPayments);
router.get("/:id/FP",auth,employeeCtrl.finesAndPayments);
router.patch("/Up/:id/FP",auth,employeeCtrl.finesAndPayments);
router.delete("/remove/:id/FP",auth,employeeCtrl.finesAndPayments);

router.post("/add/history/:id",auth, employeeCtrl.history);

router.post("/add/paytype/:id",auth, employeeCtrl.PayType);

router.post("/add/stdPay/:id", employeeCtrl.standardPay);

module.exports = router;