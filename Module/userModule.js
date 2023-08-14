const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");

const userModule = {};

userModule.register = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const values = [username.email, password];
    const result = await db.query(query, values);
    return { success: true, userId: result.row[0].id };
  } catch (error) {
    console.log("Error: ", error);
  }
};
