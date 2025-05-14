const productModel = require("../models/productModel");
const uploadProductPermission = require("../helpers/permission");

const uploadProductController = async(req,res) => {
    try {
        const currentUserId = req.userId;
        if(!uploadProductPermission(currentUserId)){
            throw new Error("Permission denied");
        }
        const {productName, brandName, category, productImage, description, price, sellingPrice} = req.body;
        if(!productName || !brandName || !category || !productImage || !description || !price || !sellingPrice){
            throw new Error("please provide all the details");
        }

        const newProduct = new productModel(req.body);
        const productDetails = await newProduct.save();

        return res.status(201).json({
            message: "product uploaded successfully",
            data : productDetails,
            success: true,
            error: false,
          });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error" || error,
            success: false,
            error: true,
          });
    }
}


module.exports = uploadProductController;