const { Pool } = require("pg");

const db = new Pool({
  user: "postgres",
  password: "zahraa123",
  host: "localhost",
  port: 5432,
  database: "Tasker",
});

module.exports = db;
