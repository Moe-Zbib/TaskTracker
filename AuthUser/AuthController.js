const db = require("../Module/db");
const bcrypt = require("bcrypt");
const { createJWT } = require("../jwt");
const { generateUserId } = require("./idGenerator");

const authController = {};

authController.register = async (username, email, password) => {
  try {
    const newUser = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (newUser.rows.length > 0) {
      console.log("Email already exists");
      return { success: false, message: "Email already exists" };
    }
    console.log(username);
    console.log(password);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const userId = await generateUserId();

    console.log("3");

    await db.query(
      "INSERT INTO users (username, email, password, id) VALUES ($1, $2, $3, $4)",
      [username, email, hashedPassword, userId]
    );

    const token = createJWT({ id: userId, username });
    console.log("Token:", token);

    return { success: true, message: "Registration successful", token: token };
  } catch (error) {
    console.error("Error registering: ??", error.message);
    return { success: false, message: "Registration error" };
  }
};

authController.login = async (email, password) => {
  try {
    const results = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (results.rows.length === 0) {
      console.log("User doesn't exist");
      return { success: false, message: "User doesn't exist" };
    }

    const user = results.rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      console.log("Logged in");
      const token = createJWT({ id: user.id, username: user.username });

      console.log("Token:", token);
      return { success: true, message: "Login successful" };
    } else {
      console.log("Failed");
      return { success: false, message: "Login failed" };
    }
  } catch (error) {
    console.log("Error:", error);
    return { success: false, message: "Login error" };
  }
};

module.exports = authController;
