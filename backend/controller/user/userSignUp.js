const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const userSignUpController = async(req,res) =>{
    try {
        userModel
        const {username, email, password} = req.body;
        const userExist = await userModel.findOne({email});
        
        if(!username || !email || !password){
            throw new Error("please provide all the details")
        }
        if (userExist) {
            throw new Error("user already exist")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const userData = new userModel({
            ...req.body,
            role : "GENERAL",
            password : hashPassword,
        });
        const savedUser = await userData.save();
        
        return res.status(201).json({
            message : "user created successfully",
            data : savedUser,
            success : true,
            error : false,
        })
        
    } catch (error) {
        return res.status(404).json({
            message : error.message || "Internal Server Error",
            success : false,
            error : true,
        })
    }
}

module.exports = userSignUpController;