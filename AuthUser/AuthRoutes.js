const express = require("express");
const router = express.Router();
const authController = require("./AuthController");
const authMiddleware = require("./AuthMiddleware");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const registerInfo = await authController.register(
    username,
    email,
    password,
    req
  );

  if (registerInfo.success) {
    res.status(200).json({ message: "Registration successful" });
  } else {
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const loginInfo = await authController.login(email, password, req);

  if (loginInfo.success) {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Login failed" });
  }
});

module.exports = router;
