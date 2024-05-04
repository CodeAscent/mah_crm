const jwt = require("jsonwebtoken");
require("dotenv");
const generateJwt = (userId) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "2 days",
  });
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ status: "failed", message: "Authorization Failed" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = decoded._id;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
};
module.exports = { generateJwt, verifyToken };
