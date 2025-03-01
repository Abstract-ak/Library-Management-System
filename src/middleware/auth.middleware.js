const { verifyToken } = require("../utils/jwt.utils");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: "error",
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        status: "error",
        message: "Invalid token",
      });
    }

    const user = await User.findByPk(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({
        status: "error",
        message: "User not found or inactive",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Authentication failed",
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "error",
        message: "Not authorized to access this resource",
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize,
};
