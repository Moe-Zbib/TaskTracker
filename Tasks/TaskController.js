const groupController = require("../Group/GroupController");
const db = require("../Module/db");
const Roles = require("../enums/roles");

const taskController = {};

taskController.create = async (
  title,
  description,
  taskType,
  priority,
  assignedToUserId,
  assignedByUserId,
  groupId,
  dependencyId,
  tags,
  comments,
  startDate,
  deadline,
  completionPercentage
) => {
  try {
    // Insert the new task into the tasks table
    const result = await db.query(
      `INSERT INTO tasks
        (task_type, task_details, priority, status, assigned_to, assigned_by,
         group_id, dependency_id, tags, comments, start_date, deadline,
         completion_percentage)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING task_id`,
      [
        taskType,
        description,
        priority,
        "Pending",
        assignedToUserId,
        assignedByUserId,
        groupId,
        dependencyId,
        tags,
        comments,
        startDate,
        deadline,
        completionPercentage,
      ]
    );

    if (result.rows.length > 0) {
      const newTaskId = result.rows[0].task_id;
      console.log(`New task with ID ${newTaskId} created successfully.`);
    }
  } catch (error) {
    console.error("Error creating task:", error);
  }
};
