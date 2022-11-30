const router = require('express').Router();
const timesheetCtrl = require('../Controllers/Employee/TimesheetController');
const auth = require('../Middleware/auth');

//Employee Profile Operations -Done Testing
router.post("/add",auth, timesheetCtrl.payments);
router.get("/list/:id",auth, timesheetCtrl.payments);
router.get("/list/:fromDate/:toDate",auth, timesheetCtrl.payments);
router.get("/list",auth, timesheetCtrl.payments);
router.patch("/update/:id/",auth, timesheetCtrl.payments);
router.delete("/remove/:id", timesheetCtrl.payments);

// //Employee ContactDetails Operations 
// router.post("/add/CD/:id",auth, employeeCtrl.ContactDetails);
// router.get("/:id/CD",auth,employeeCtrl.ContactDetails);
// router.patch("/update/:id/CD",auth,employeeCtrl.ContactDetails);
// router.delete("/remove/:id/CD",auth,employeeCtrl.ContactDetails);

// //Employee finesAndPayments Operations
// router.post("/add/FP/:id",auth, employeeCtrl.finesAndPayments);
// router.get("/:id/FP",auth,employeeCtrl.finesAndPayments);
// router.patch("/update/:id/FP",auth,employeeCtrl.finesAndPayments);
// router.delete("/remove/:id/FP",auth,employeeCtrl.finesAndPayments);

// router.post("/add/history/:id",auth, employeeCtrl.history);

// router.post("/add/paytype/:id",auth, employeeCtrl.PayType);

// router.post("/add/stdPay/:id", employeeCtrl.standardPay);

module.exports = router;