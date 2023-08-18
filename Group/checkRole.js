const authMiddleware = require("../AuthUser/AuthMiddleware");
const db = require("../Module/db");
const roles = require("../enums/roles");

const checkRole = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log("User Id: ", userId);
    const userRoleQuery = await db.query(
      "SELECT role FROM group_members WHERE user_id = $1",
      [userId]
    );

    if (userRoleQuery.rows.length === 0) {
      res.status(403).json({ message: "No permission" });
    }

    const userRole = userRoleQuery.rows[0].role;
    console.log("User Role: ", userRole);

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
