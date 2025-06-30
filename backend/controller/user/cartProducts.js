const cartProductModel = require("../../models/cartProductModel");

const cartProductsController = async(req,res) => {
    try {
        const currentUserId = req.userId;

        const cartProducts = await cartProductModel.find({
            userId : currentUserId,
        }).populate("productId")

        return res.status(200).json({
            data : cartProducts,
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

module.exports = cartProductsController;