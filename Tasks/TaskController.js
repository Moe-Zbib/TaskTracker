const db = require("../Module/db");
const transporter = require("../utils/nodeMailer");
const Roles = require("../enums/roles");
const { getUserEmail } = require("../utils/getEmail");
const { Queue } = require("bull");

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
    console.log("inserting");
    const result = await db.query(
      `INSERT INTO tasks
            (task_type, task_details, priority, status, assigned_to, assigned_by,
             group_id, dependency_id, tags, comments, start_date, deadline,
             completion_percentage, title)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
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
        title,
      ]
    );

    if (result.rows.length > 0) {
      const newTaskId = result.rows[0].task_id;
      console.log(`New task with ID ${newTaskId} created successfully.`);
    }

    /*{   const assignedEmail = await getUserEmail(assignedToUserId);
    if (assignedEmail) {
      const mailOptions = {
        from: "notifications@tasksystem.com",
        to: assignedEmail,
        subject: "New Task Assigned ",
        text: "You have been assigned a new task : ${title}",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        }
        {
          console.log("Succeeded");
        }
      });
    }}*/
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

module.exports = taskController;
