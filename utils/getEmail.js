const db = require("../Module/db");

async function getUserEmail(userId) {
  try {
    const query = "SELECT email FROM users WHERE id = $1";
    const result = await db.query(query, [userId]);
    if (result.rows.length > 0) {
      return result.rows[0].email;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user email:", error);
    throw error;
  }
}

module.exports = { getUserEmail };
