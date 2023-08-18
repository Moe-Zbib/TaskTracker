-- Table to store user information
CREATE TABLE Users (
user_id INT PRIMARY KEY,
username VARCHAR(255) UNIQUE,
password_hash VARCHAR(255),
registration_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
role_id INT,
FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Table to define roles and permissions
CREATE TABLE Roles (
role_id INT PRIMARY KEY,
role_name VARCHAR(50) UNIQUE
);

-- Table to store information about submitted tasks
CREATE TABLE Tasks (
task_id INT PRIMARY KEY,
task_type VARCHAR(255),
priority INT,
execution_requirements JSON,
submit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
status VARCHAR(20) DEFAULT 'Pending'
);

-- Table to represent available servers
CREATE TABLE Servers (
server_id INT PRIMARY KEY,
server_name VARCHAR(255),
cpu_capacity FLOAT,
memory_capacity FLOAT,
status VARCHAR(20) DEFAULT 'Active'
);

-- Table to manage the task queue
CREATE TABLE TaskQueue (
queue_id INT PRIMARY KEY,
task_id INT,
server_id INT,
queue_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
FOREIGN KEY (server_id) REFERENCES Servers(server_id)
);

-- Table to track task execution and server assignment
CREATE TABLE TaskExecution (
execution_id INT PRIMARY KEY,
task_id INT,
server_id INT,
start_time TIMESTAMP,
end_time TIMESTAMP,
status VARCHAR(20) DEFAULT 'Running',
FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
FOREIGN KEY (server_id) REFERENCES Servers(server_id)
);

-- Table to associate tasks with users
CREATE TABLE UserTasks (
user_task_id INT PRIMARY KEY,
user_id INT,
task_id INT,
FOREIGN KEY (user_id) REFERENCES Users(user_id),
FOREIGN KEY (task_id) REFERENCES Tasks(task_id)
);

-- Insert default roles
INSERT INTO Roles (role_id, role_name) VALUES
(1, 'admin'),
(2, 'worker');

**tasks**
priority: Represents the priority of the task, such as "Low," "Medium," or "High."
start_date: Indicates the start date of the task.
deadline: Specifies the deadline for completing the task.
completion_percentage: Represents the completion percentage of the task (0-100).
dependency_id: Represents the ID of a task that this task depends on.
tags: Stores tags or categories associated with the task.
comments: Stores text-based comments and discussions related to the task.

CREATE TABLE tasks (
task_id SERIAL PRIMARY KEY,
task_type VARCHAR(255) NOT NULL,
task_details TEXT,
priority VARCHAR(20) NOT NULL, -- Low, Medium, High
status VARCHAR(50) NOT NULL,
assigned_to INT,
assigned_by INT,
group_id INT,
dependency_id INT, -- For task dependencies
tags VARCHAR(255), -- For task tags or categories
comments TEXT, -- For task comments and discussions
start_date TIMESTAMP, -- Task start date
deadline TIMESTAMP, -- Task deadline
completion_percentage INT, -- Task completion percentage (0-100)

    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (assigned_by) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id),
    FOREIGN KEY (dependency_id) REFERENCES tasks(task_id) -- For task dependencies

);

# ALGORTHIMS:

Task Priority Queue:
Implement a priority queue data structure to efficiently manage tasks based on their priority levels. This can be used to ensure that high-priority tasks are processed before lower-priority ones.

Task Assignment Algorithm:
Develop an algorithm that intelligently assigns tasks to users based on factors like user workload, skill level, and task priority. This can help optimize task distribution and resource utilization.

Task Scheduling Algorithm:
Create a scheduling algorithm that determines the optimal order in which tasks should be executed to minimize overall execution time while considering task dependencies and resource availability.

Deadline Tracking:
Build an algorithm that monitors task deadlines and sends notifications to relevant users when a task is approaching its deadline or when a deadline is missed.

Task Analytics:
Implement algorithms to generate task-related analytics, such as task completion rates, average completion time, and user productivity. This can provide insights into your system's efficiency.

Collaborative Filtering:
Develop a collaborative filtering algorithm to recommend tasks to users based on their preferences, historical task assignments, and the preferences of similar users.

Resource Optimization:
Design an algorithm that optimizes resource usage by considering server availability, task execution time, and resource constraints to allocate tasks effectively.

Task Dependencies Resolution:
Create an algorithm to manage tasks with dependencies, ensuring that tasks are executed in the correct order based on their dependencies.

Time Estimation:
Develop an algorithm that estimates the time required for task completion based on historical data, user input, and task complexity. This can help users plan their schedules more effectively.

Automated Task Rescheduling:
Build an algorithm that automatically reschedules tasks when a resource becomes unavailable or when a task's dependencies change.
