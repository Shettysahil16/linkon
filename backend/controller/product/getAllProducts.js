const productModel = require('../../models/productModel')

const getAllProductsController = async(req,res) => {
    try {
        const allProducts = await productModel.find().sort({createdAt : -1});

        return res.status(200).json({
            message : "all products",
            data : allProducts,
            success: true,
            error : false
        })
    } catch (error) {
        return res.status(500).json({
            message : "Internal Server Error" || error.message,
            success : false,
            error : true,
        })
    }
}

module.exports = getAllProductsController;