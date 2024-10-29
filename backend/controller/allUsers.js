const userModel = require("../models/userModel");

const allUsersController = async(req,res) => {
try {
    const alluserDetails = await userModel.find();

    return res.json({
        data : alluserDetails,
        message : "all users details",
        success : true,
        error : false
    })
    
} catch (error) {
    return res.status(404).json({
        message: "Internal Server Error",
        success: false,
        error: true,
      });
}
}

module.exports = allUsersController