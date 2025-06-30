const cartProductModel = require("../../models/cartProductModel");

const cartProductCountController = async (req, res) => {
  try {
    const currentUserId = req.userId;

    const productCount = await cartProductModel.countDocuments({
        userId : currentUserId,
    });

    return res.status(200).json({
        data : {count : productCount},
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
};

module.exports = cartProductCountController;
