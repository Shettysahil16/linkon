const userModel = require("../../models/userModel");

const userDetailsController = async(req,res) => {
    try {
        const user = await userModel.findById(req.userId);
        return res.status(200).json({
            data : user,
            message: "user details",
            success: true,
            error: false,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true,
          });
    }
}

module.exports = userDetailsController