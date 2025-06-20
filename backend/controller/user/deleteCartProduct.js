const cartProductModel = require("../../models/cartProductModel");

const deleteCartProductController = async(req,res) => {
    try {
        const {productId} = req.body;

        const deleteProduct = await cartProductModel.deleteOne({_id : productId});

        return res.status(200).json({
            data : deleteProduct,
            message : "product removed from cart",
            success : true,
            error : false,
        })
    } catch (error) {
        return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
    }
}
module.exports = deleteCartProductController