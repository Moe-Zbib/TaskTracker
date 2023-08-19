const express = require("express");
const router = express.Router();
const taskController = require("./TaskController");
const { route } = require("../routes");
const authMiddleware = require("../AuthUser/AuthMiddleware");

router.post("/create", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      taskType,
      priority,
      assignedToUserId,
      tags,
      comments,
      startDate,
      deadline,
      completionPercentage,
      groupId,
      dependencyId,
    } = req.body;

    const assignedByUserId = req.user.userId;
    console.log("assigned by:", assignedByUserId);
    await taskController.create(
      title,
      description,
      taskType,
      priority,
      assignedToUserId,
      assignedByUserId,
      groupId,
      dependencyId,
      tags,
      comments,
      startDate,
      deadline,
      completionPercentage
    );

    res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    console.error("Error creating task:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the task" });
  }
});

module.exports = router;
