const express = require('express');

//users route
const userSignUpController = require('../controller/user/userSignUp');
const userLoginController = require('../controller/user/userLogin');
const userDetailsController = require('../controller/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogoutController = require('../controller/user/userLogout');
const allUsersController = require('../controller/user/allUsers');
const updateUsersController = require('../controller/user/updateUsers');

//products route
const uploadProductController = require('../controller/product/uploadProduct');
const getAllProductsController = require('../controller/product/getAllProducts');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCart');
const cartProductCountController = require('../controller/user/cartProductCount');
const cartProductsController = require('../controller/user/cartProducts');
const updateCartProductQtyController = require('../controller/user/updateCartProductQty');
const deleteCartProductController = require('../controller/user/deleteCartProduct');
const searchProductController = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');


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
router.get("/get-productCategory",getCategoryProduct);
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);
router.get("/search-product",searchProductController);
router.post("/filter-product",filterProductController);

//Add to Cart API
router.post("/addtocart",authToken,addToCartController);
router.get("/cart-product-count",authToken,cartProductCountController);
router.get("/cart-products",authToken,cartProductsController);
router.put("/update-cartProductQty",authToken,updateCartProductQtyController);
router.delete("/delete-cartProduct",authToken,deleteCartProductController);

module.exports = router;
