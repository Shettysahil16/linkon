const express = require('express')
const userSignupController = require('../controller/userSignup');
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middlewares/authToken');
const userLogoutController = require('../controller/userLogout');
const allUsersController = require('../controller/allUsers');

const router = express.Router()

router.post("/signup",userSignupController);
router.post("/login", userLoginController);
router.get("/user-details",authToken,userDetailsController);
router.get("/user-logout",userLogoutController);

// admin panel api
router.get("/all-users",authToken,allUsersController);

module.exports = router