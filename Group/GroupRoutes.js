const express = require("express");
const router = express.Router();
const groupController = require("./GroupController");
const { validateGroupInput } = require("./validateGroupInpute");
const { limit } = require("./groupRateLimitter");
const authMiddleware = require("../AuthUser/AuthMiddleware");

router.post(
  "/create",
  authMiddleware,
  limit,
  validateGroupInput,
  async (req, res) => {
    const { name, description, privacy } = req.body;
    const userId = req.user.userId; // User ID from the decoded JWT

    try {
      const createReq = await groupController.create(
        name,
        description,
        privacy,
        userId
      );
      res.status(201).json(createReq);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: "Group creation failed" });
    }
  }
);

module.exports = router;
