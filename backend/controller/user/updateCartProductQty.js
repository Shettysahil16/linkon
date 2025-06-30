const cartProductModel = require("../../models/cartProductModel");

const updateCartProductQtyController = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const payload = {
      quantity: qty,
    };

    const updateProduct = await cartProductModel.findByIdAndUpdate(
      productId,
      payload,
      { new: true }
    );

    return res.status(200).json({
      data: updateProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
module.exports = updateCartProductQtyController;
