const express = require("express");
const router = express.Router();
const groupController = require("./GroupController");
const { validateGroupInput } = require("./validateGroupInpute");
const { limit } = require("./groupRateLimitter");
const authMiddleware = require("../AuthUser/AuthMiddleware");
const { verifyCode } = require("./invCode");
const checkRole = require("./checkRole");

router.post(
  "/create",
  authMiddleware,
  limit,
  validateGroupInput,
  async (req, res) => {
    const { name, description, public } = req.body;

    const userId = req.user.userId;
    const createReq = await groupController.create(
      name,
      description,
      public,
      userId
    );

    if (createReq.success) {
      res.status(200).json({ message: "Group created successfully" });
    } else {
      res.status(500).json({ message: "Group creation failed" });
    }
  }
);

router.post("/edit", authMiddleware, checkRole, async (req, res) => {
  try {
    const { groupId, newGroupName } = req.body;
    const editReq = await groupController.edit(groupId, newGroupName);
    res.status(200).json({ message: "Group name updated successfully" });
  } catch (error) {
    console.error("Group edit error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating group name" });
  }
});

router.post("/join", authMiddleware, async (req, res) => {
  const { invCode } = req.body;
  const userId = req.user.userId;
  const { isPublic, groupId, userExists } = await verifyCode(invCode, userId);
  if (groupId === null) {
    return res.status(400).json({ message: "Group not found" });
  }
  if (!isPublic) {
    return res
      .status(403)
      .json({ message: "Access forbidden. Group is private" });
  }
  if (userExists) {
    return res.status(403).json({ message: "User already in group" });
  }
  const joinReq = await groupController.join(groupId, userId);
  res.status(200).json({ message: "You can join the group" });
});

module.exports = router;
