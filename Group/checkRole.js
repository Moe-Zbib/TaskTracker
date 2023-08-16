const authMiddleware = require("../AuthUser/AuthMiddleware");
const db = require("../Module/db");
const roles = require("../enums/roles");

const checkRole = async (req, res, next) => {
  try {
    const userRole = req.user.role;

    if (userRole === roles.ADMIN || userRole === roles.MODERATOR) {
      next();
    } else {
      res.status(403).json({ message: "No permission" });
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = checkRole;
