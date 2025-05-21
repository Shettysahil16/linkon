const productModel = require("../../models/productModel");

const getCategoryWiseProduct = async (req, res) => {
  try {
    const {category} = req.body || req?.query;
    const product = await productModel.find({category});
    return res.status(200).json({
        data : product,
        success : true,
        error : false,
    })
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      message: "Internal Server Error" || error,
      success: false,
      error: true,
    });
  }
};

module.exports = getCategoryWiseProduct;
