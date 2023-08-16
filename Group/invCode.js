const { verify } = require("jsonwebtoken");
const db = require("../Module/db");

const genInvCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const codeLength = 8;
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

const verifyCode = async (invCode, userId) => {
  try {
    const result = await db.query("SELECT * FROM groups WHERE inv_code = $1", [
      invCode,
    ]);

    if (result.rows.length === 0) {
      return { isPublic: false, groupId: null };
    }

    const isPublic = result.rows[0].public;
    const groupId = result.rows[0].id;
    console.log("isPublic:", isPublic, "groupId", groupId);

    const userExists = await db.query(
      "SELECT COUNT(*) FROM group_members WHERE user_id = $1 AND group_id = $2",
      [userId, groupId]
    );

    if (
      userExists.rows &&
      userExists.rows.length > 0 &&
      userExists.rows[0].count > 0
    ) {
      return { isPublic, groupId, userExists };
    }

    return { isPublic, groupId, userExists: false };
  } catch (error) {
    console.error("Checking group inv code error", error);
  }
};

module.exports = { genInvCode, verifyCode };
