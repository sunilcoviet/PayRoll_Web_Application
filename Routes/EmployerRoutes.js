const router = require('express').Router();
const employerCtrl = require('../Controllers/PatientController');
const auth = require('../Middleware/auth');

router.get('/list', employerCtrl.usersList);

router.get("/details/:id",auth, employerCtrl.patientDetails);

router.post("/login", employerCtrl.login);

router.patch("/update/:id",auth, employerCtrl.patientUpdate);

router.delete("/remove/:id", employerCtrl.patientDelete);

module.exports = router;



