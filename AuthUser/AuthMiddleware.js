const jwt = require("jsonwebtoken");
const { verifyJWT } = require("../jwt");

const authMiddleware = (req, res, next) => {
  try {
    if (!req.header("Authorization")) {
      throw new Error("Authorization header missing");
    }
    const token = req.header("Authorization").replace("Bearer ", "");

    const decoded = verifyJWT(token, "86dtfyoguihoikp");
    req.user = decoded;
    next();
    console.log("Auth middleware check");
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authMiddleware;
