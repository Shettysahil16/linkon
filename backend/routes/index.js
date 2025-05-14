const express = require('express');
const userSignUpController = require('../controller/userSignUp');
const userLoginController = require('../controller/userLogin');
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogoutController = require('../controller/userLogout');
const allUsersController = require('../controller/allUsers');
const updateUsersController = require('../controller/updateUsers');
const uploadProductController = require('../controller/uploadProduct');
const getAllProductsController = require('../controller/getAllProducts');
const updateProductController = require('../controller/updateProduct');


const router = express.Router();

//Users API
router.post("/signup",userSignUpController);
router.post("/login",userLoginController);
router.get("/user-details",authToken,userDetailsController);
router.get("/user-logout",userLogoutController);
router.get("/all-users",authToken,allUsersController);
router.put("/update-users",authToken,updateUsersController);

//Products API
router.post("/upload-product",authToken,uploadProductController);
router.get("/get-products",getAllProductsController);
router.put("/update-product",authToken,updateProductController);

module.exports = router;