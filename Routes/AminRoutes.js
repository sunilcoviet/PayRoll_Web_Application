const router = require('express').Router();
const adminCtrl = require('../Controllers/AdminController');
const auth = require('../Middleware/auth');

router.post('/login', adminCtrl.adminLogin);

router.patch('/verify/:id/:role',adminCtrl.verifyRole);

module.exports = router;