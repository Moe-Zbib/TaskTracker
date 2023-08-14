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
