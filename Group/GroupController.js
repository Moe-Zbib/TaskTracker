const db = require("../Module/db");
const Roles = require("../enums/roles");
const { generateGroupId } = require("../AuthUser/idGenerator");
const { genInvCode } = require("./invCode");
const { use } = require("./GroupRoutes");

const groupController = {};

groupController.create = async (name, description, public, userId) => {
  console.log("from controller side ", name, description);

  try {
    const invCode = await genInvCode();
    const groupId = await generateGroupId();
    const addedGroup = await db.query(
      "INSERT INTO groups (name, description, created_by, public, id, inv_code ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [name, description, userId, public, groupId, invCode]
    );

    await db.query(
      "INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3)",
      [groupId, userId, Roles.ADMIN]
    );
    return { success: true, groupId: addedGroup.rows[0].id };
  } catch (error) {
    console.error("Group creation failed:", error);
    return { success: false, message: "Group error" };
  }
};

groupController.join = async (groupId, userId) => {
  console.log(groupId, userId);
  try {
    const addedInv = await db.query(
      "INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3) ",
      [groupId, userId, Roles.MEMBER]
    );
  } catch (error) {
    console.error("Group joining failed", error);
  }
};
groupController.edit = async (groupId, newGroupName) => {
  try {
    const updateQuery = await db.query(
      "UPDATE groups SET group_name = $1 WHERE id = $2",
      [newGroupName, groupId]
    );
    return updateQuery;
  } catch (error) {
    console.error("Error in controller", error);
    throw error;
  }
};

module.exports = groupController;
