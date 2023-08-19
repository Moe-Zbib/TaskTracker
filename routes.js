const express = require("express");
const router = express.Router();
const AuthRoutes = require("./AuthUser/AuthRoutes");
const { customLimiter } = require("./AuthUser/rateLimit");
const GroupRoutes = require("./Group/GroupRoutes");
const TaskRoutes = require("./Tasks/TaskRoutes");

router.use("/auth", customLimiter, AuthRoutes);
router.use("/group", GroupRoutes);
router.use("/task", TaskRoutes);

module.exports = router;
