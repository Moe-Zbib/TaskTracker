const db = require("../Module/db");

const generateUserId = async () => {
  while (true) {
    const userId = Math.floor(100000 + Math.random() * 9000);
    const exists = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (exists.rows.length === 0) {
      return userId;
    }
  }
};

const generateGroupId = async () => {
  while (true) {
    const groupId = Math.floor(1000 + Math.random() * 9000);
    const exists = await db.query("SELECT * FROM users WHERE id = $1", [
      groupId,
    ]);
    if (exists.rows.length === 0) {
      return groupId;
    }
  }
};

module.exports = { generateUserId, generateGroupId };
