const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const userSignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userEmailExist = userModel.findOne({ email });
    if (!email) {
        return res.status(404).json({
          message: "email cannot be empty",
          success: false,
          error: true,
        });
      }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);
      const payload = {
        ...req.body,
        role : 'GENERAL',
        password: hashPassword,
      };
      const userData = new userModel(payload);
      const savedUser = await userData.save();
      return res.status(201).json({
        data: savedUser,
        message: "user created successfully",
        success: true,
        error: false,
      });
    } catch (error) {
      if (!username) {
        return res.status(404).json({
          message: "username cannot be empty",
          success: false,
          error: true,
        });
      }
      
      if (!password) {
        return res.status(404).json({
          message: "password cannot be empty",
          success: false,
          error: true,
        });
      }
      if (userEmailExist) {
        return res.status(422).json({
          message: "user with this email already exist",
          success: false,
          error: true,
        });
      }
    }
  } catch (error) {
    return res.status(404).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = userSignupController;
