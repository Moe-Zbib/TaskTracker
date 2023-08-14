const db = require("../Module/db");
const { generateGroupId } = require("../AuthUser/idGenerator");

const groupController = {};

groupController.create = async (name, description, privacy, userId) => {
  const groupId = await generateGroupId();
  try {
    const add = await db.query(
      "INSERT INTO groups (name, description, created_by, privacy, id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
      [name, description, userId, privacy, groupId]
    );
    return { success: true, groupId: add.rows[0].id };
  } catch (error) {
    console.error("Group creation failed:", error);
    throw new Error("Group creation failed");
  }
};

module.exports = groupController;
