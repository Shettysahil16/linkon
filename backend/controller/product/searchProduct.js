const productModel = require("../../models/productModel");

const searchProductController = async(req,res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({
                message: "Missing search query parameter 'q'",
                success: false,
                error: true,
            });
        }

        const regex = new RegExp(query, "ig");

        const products = await productModel.find({
            "$or" : [
                {
                    productName : regex,
                },
                {
                    category : regex,
                },
            ]
        })

        return res.status(200).json({
            data : products,
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
module.exports = searchProductController;