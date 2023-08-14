const express = require("express");
const router = express.Router();
const AuthRoutes = require("./AuthUser/AuthRoutes");
const { customLimiter } = require("./AuthUser/rateLimit");
const GroupRoutes = require("./Group/GroupRoutes");
const authMiddleware = require("./AuthUser/AuthMiddleware");

router.use("/auth", customLimiter, AuthRoutes);
router.use("/group", GroupRoutes);

module.exports = router;
