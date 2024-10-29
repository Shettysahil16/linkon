const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const authToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({
          message: "please authenticate using a valid token",
          error: true,
          success: false,
        });
    }
    if (token) {
      const userToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN,)
      const userData = await userModel.findOne({email : userToken.email});
      req.userId = userData._id;
      next();
      
    }
  } catch (error) {
    return res.status(404).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = authToken;
