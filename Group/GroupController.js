const db = require("../Module/db");
const Roles = require("../enums/roles");
const { generateGroupId } = require("../AuthUser/idGenerator");
const { genInvCode } = require("./invCode");

const groupController = {};

groupController.create = async (name, description, public, userId) => {
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

groupController.kickUser = async (groupId, userId) => {
  try {
    const kickedUserRoleQuery = await db.query(
      "SELECT role FROM group_members WHERE group_id = $1 AND user_id = $2",
      [groupId, userId]
    );

    if (kickedUserRoleQuery.rows.length === 0) {
      throw new Error("User not found in the group");
      v;
    }

    const kickedUserRole = kickedUserRoleQuery.rows[0].role;

    if (
      requestingUserRole === roles.MODERATOR &&
      kickedUserRole === roles.MODERATOR
    ) {
      throw new Error("Moderators cannot kick other moderators");
    }

    const kickUser = await db.query(
      `DELETE FROM group_members WHERE  group_id=$1 AND user_id =$2`,
      [groupId, userId]
    );
  } catch (error) {
    throw new Error("Error while deleting the member", error);
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
      "UPDATE groups SET name = $1 WHERE id = $2",
      [newGroupName, groupId]
    );
    return updateQuery;
  } catch (error) {
    console.error("Error in controller", error);
    throw error;
  }
};

groupController.delete = async (groupId) => {
  try {
    const deleteGroup = await db.query(
      `DELETE FROM group_members AND groups WHERE  group_id=$1`,
      [groupId]
    );
  } catch (error) {
    console.error("Error deleting group: ", error);
  }
};
groupController.fetch = async (userId) => {
  try {
    const groupsQuery = await db.query(
      "SELECT groups.id AS group_id, groups.name AS group_name FROM group_members INNER JOIN groups ON group_members.group_id = groups.id WHERE group_members.user_id = $1",
      [userId]
    );
    return { success: true, groups: groupsQuery.rows };
  } catch (error) {
    console.error("Error fetching user's groups:", error);
    return { success: false, message: "Failed to fetch user's groups" };
  }
};

module.exports = groupController;
