const cartProductModel = require("../../models/cartProductModel");

const addToCartController = async(req,res) => {
    try {
        const {productId} = req.body;

        const currentUserId = req.userId;

        const productExist = await cartProductModel.findOne({productId, userId : currentUserId});
        if(productExist){
            return res.status(400).json({
                message : "product already added to cart",
                success : false,
                error : true,
            })
        }

        const payload = {
            productId,
            quantity : 1,
            userId : currentUserId,
        }

        const newAddToCart = new cartProductModel(payload);
        const savedProduct = await newAddToCart.save();

        return res.status(200).json({
            data : savedProduct,
            message : "product added to cart",
            success : true,
            error : false,
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true,
          });
    }
}
module.exports = addToCartController;