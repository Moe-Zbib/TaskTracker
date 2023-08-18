const express = require("express");
const router = express.Router();
const taskController = require("./TaskController");
const { route } = require("../routes");
const authMiddleware = require("../AuthUser/AuthMiddleware");

router.post("./create", authMiddleware, async (req, res) => {
  try {
    const { name, description } = req.body;
    console.log("Creating Task ");
  } catch (error) {
    console.error("Error on", error);
  }
});
