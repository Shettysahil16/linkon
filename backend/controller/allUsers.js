const userModel = require("../models/userModel");

const allUsersController = async(req,res) => {
    try {
        const allUsers = await userModel.find();

        return res.status(200).json({
            message : "all users",
            data : allUsers,
            success: true,
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

module.exports = allUsersController;