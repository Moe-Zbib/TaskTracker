const express = require("express");
const router = express.Router();
const groupController = require("./GroupController");
const { validateGroupInput } = require("./validateGroupInput");
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

router.delete("/kick", authMiddleware, checkRole, async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    console.log("Kicking user from the group", groupId, "with id", userId);
    const kickedUser = await groupController.kickUser(groupId, userId);
    res.status(200).json({ message: "User kicked from the group" });
  } catch (error) {
    console.error(`Error occurred in Kick User: ${error}`);
    res.status(500).json({ message: "An error occurred while kicking user" });
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
  res.status(200).json({ message: "User Joined Group" });
});

router.delete("/delete", authMiddleware, checkRole, async (req, res) => {
  const groupId = req.body;
  console.log("Deleting Group...");
  const deleteGroup = await groupController.delete(groupId);
});

router.get("/fetch", authMiddleware, async (req, res) => {
  const userId = req.user.userId;
  console.log("user id:", userId);
  const userGroups = await groupController.fetch(userId);
  if (userGroups.success) {
    res.status(200).json({ groups: userGroups.groups });
    console.log("Groups fetched");
  } else {
    res.status(500).json({ message: "Failed to fetch user's groups" });
  }
});

module.exports = router;
