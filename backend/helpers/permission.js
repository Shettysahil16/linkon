const userModel = require("../models/userModel");

const uploadProductPermission = async(userId) => {
    const currentUser = await userModel.findById(userId);

    if(currentUser.role !== "ADMIN"){
        return false;
    }
    return true;
}

module.exports = uploadProductPermission;