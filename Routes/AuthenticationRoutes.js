const router = require('express').Router();
const authCtrl = require('../Controllers/AuthenticationController');
const auth = require('../Middleware/auth');


router.post('/register', authCtrl.register);

// router.post("/register_admin", authCtrl.registerAdmin);

router.post("/changePassword", auth,  authCtrl.changePassword);



// router.post("/admin_login", authCtrl.adminLogin);

router.post("/logout", authCtrl.logout);

router.post("/refresh_token", authCtrl.generateAccessToken);


module.exports = router;