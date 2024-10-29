const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!email) {
      return res.status(404).json({
        message: "email cannot be empty",
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
    if (!user) {
      return res.status(404).json({
        message: "user does not exist",
        success: false,
        error: true,
      });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const payload = {
        _id: user._id,
        email: user.email,
      };

      const jwtToken = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
        expiresIn: "30d",
      });

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      res.cookie("token", jwtToken, tokenOption).status(200).json({
        data: jwtToken,
        message: "login successful",
        success: true,
        error: false,
      });
    } else {
      res.status(422).json({
        message: "incorrect password",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = userLoginController;
