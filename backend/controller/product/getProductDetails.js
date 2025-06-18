const productModel = require("../../models/productModel");

const getProductDetails = async (req, res) => {
  try {
    const {productId} = req.body;

    const productDetails = await productModel.findById(productId);
    
    return res.status(200).json({
        data : productDetails,
        success : true,
        error : false
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getProductDetails;
