const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please login to continue",
                error: true,
                success: false,
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
            req.userId = decoded._id;
            next();
        } catch (verifyError) {
            console.error("JWT verification error:", verifyError.message);
            return res.status(401).json({
                message: "Invalid or expired token",
                error: true,
                success: false,
            });
        }
    } catch (err) {
        console.error("Auth middleware error:", err.message);
        return res.status(500).json({
            message: "Internal server error in auth middleware",
            error: true,
            success: false,
        });
    }
};

module.exports = authToken;
