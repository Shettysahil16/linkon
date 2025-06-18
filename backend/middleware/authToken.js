const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authToken = async(req,res,next) => {
    try {
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({
                message: "please login",
                error: true,
                success: false,
            })
        }

        if(token){
            const userToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            req.userId = userToken._id;
            next();
        }
    } catch (error) {
        return res.status(404).json({
            message: "Middleware Server Error",
            success: false,
            error: true,
        })
    }
}

module.exports = authToken;

