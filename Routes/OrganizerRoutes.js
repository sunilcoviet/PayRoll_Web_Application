const router = require('express').Router();
const patientCtrl = require('../Controllers/PatientController');
const auth = require('../Middleware/auth');

router.get('/list', patientCtrl.usersList);

router.get("/details/:id",auth, patientCtrl.patientDetails);

router.post("/login", patientCtrl.login);

router.patch("/update/:id",auth, patientCtrl.patientUpdate);

router.delete("/remove/:id", patientCtrl.patientDelete);

module.exports = router;



add oragnization
update oragnization
delete oragnization
Read oragnization
