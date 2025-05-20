const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userLoginController = async(req,res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).json({
                message : "please provide all the details",
                success : false,
                error : true
            })
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message : "user does not exist",
                success : false,
                error : true
            })
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(checkPassword){
            const payload = {
                _id : user._id,
                email : user.email
            }
            
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {expiresIn: "30d",});

            const tokenOption = {
                httpOnly: true,
                secure: true,
              };

              return res.cookie("token",jwtToken,tokenOption).status(200).json({
                message : "login successful",
                data : jwtToken,
                success : true,
                error : false
              })
        }
        if(!checkPassword){
            return res.status(422).json({
                message : "incorrect password",
                success : false,
                error : true
            })
        }

    } catch (error) {
        return res.status(404).json({
            message : "Internal Server Error",
            success : false,
            error : true
        })
    }
}

module.exports = userLoginController;