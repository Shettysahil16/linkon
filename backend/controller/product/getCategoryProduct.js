const productModel = require("../../models/productModel");

const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    const productByCategory = [];

    for(const category of productCategory){
        const product = await productModel.findOne({category});

        if(product){
            productByCategory.push(product);
        }
    }

    return res.json({
        message : "products category",
        data : productByCategory,
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

module.exports = getCategoryProduct;
