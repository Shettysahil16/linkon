const userLogoutController = async(req,res) => {
    try {
        res.clearCookie("token");
        
        return res.status(200).json({
            message : "user logout successful",
            success : true,
            error : false,
            data : [],
        })
    } catch (error) {
        return res.status(404).json({
            message : "Internal Server Error",
            success : false,
            error : true
        })
    }
}

module.exports = userLogoutController;