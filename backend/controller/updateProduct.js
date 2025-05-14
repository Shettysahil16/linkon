const uploadProductPermission = require("../helpers/permission");
const productModel = require("../models/productModel");

const updateProductController = async (req, res) => {
  try {
    if (!uploadProductPermission(req.userId)) {
      throw new Error("Permission denied");
    }
    const { _id, productName, brandName, category, productImage, description, price, sellingPrice } = req.body;
    const updateData = { productName, brandName, category, productImage, description, price, sellingPrice };
    const updatedProduct = await productModel.findByIdAndUpdate(_id, updateData,{new: true});

    return res.status(200).json({
      message: "product updated",
      data: updatedProduct,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = updateProductController;
