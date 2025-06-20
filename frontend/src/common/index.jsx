const backendDomain = "http://localhost:5000"

const summaryApi = {
    signUp : {
        url : `${backendDomain}/api/signup`,
        method : "post",
    },
    login : {
        url : `${backendDomain}/api/login`,
        method : "post",
    },
    current_user : {
        url : `${backendDomain}/api/user-details`,
        method : "get",
    },
    user_logout : {
        url : `${backendDomain}/api/user-logout`,
        method : "get",
    },
    allUsers : {
        url : `${backendDomain}/api/all-users`,
        method : "get",
    },
    updateUsers : {
        url : `${backendDomain}/api/update-users`,
        method : "put",
    },
    uploadProduct : {
        url : `${backendDomain}/api/upload-product`,
        method : "post",
    },
    allProducts : {
        url : `${backendDomain}/api/get-products`,
        method : "get",
    },
    updateProduct : {
        url : `${backendDomain}/api/update-product`,
        method : "put",
    },
    productCategory : {
        url : `${backendDomain}/api/get-productCategory`,
        method : "get",
    },
    productCategoryWise : {
        url : `${backendDomain}/api/category-product`,
        method : "post",
    },
    productDetails : {
        url : `${backendDomain}/api/product-details`,
        method : "post",
    },
    addToCartProduct : {
        url : `${backendDomain}/api/addtocart`,
        method : "post",
    },
    cartProductCount : {
        url : `${backendDomain}/api/cart-product-count`,
        method : "get",
    },
    cartProducts : {
        url : `${backendDomain}/api/cart-products`,
        method : "get",
    },
    updateCartProductQty : {
        url : `${backendDomain}/api/update-cartProductQty`,
        method : "put",
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/delete-cartProduct`,
        method : "delete",
    },
}
export default summaryApi; 