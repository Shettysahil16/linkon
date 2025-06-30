const productModel = require("../../models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];

    const product = await productModel.find({
        category : {
            "$in" : categoryList,
        }
    })

    res.status(200).json({
        data : product,
        success : true,
        error : false
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
module.exports = filterProductController;
