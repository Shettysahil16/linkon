const userModel = require("../../models/userModel");

 const updateUsersController = async(req,res) => {
    try {
        const currentUserId = req.userId;
        const {userId, username, email, role} = req.body;

        const payload = {
            ...(username && {username : username}),
            ...(email && {email : email}),
            ...(role && {role : role}),
        }

        const currentUserDetails = await userModel.findById(currentUserId);

        const updatedUser = await userModel.findByIdAndUpdate(userId, payload, {new : true});

        return res.status(200).json({
            data : updatedUser,
            message : "user updated",
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

 module.exports = updateUsersController;