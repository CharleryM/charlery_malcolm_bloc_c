import { db } from "../config/database.js";
import bcrypt from "bcrypt";

export async function createUser(userName, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await db.query(
    "INSERT INTO users (userName, email, password) VALUES (?, ?, ?)",
    [userName, email, hashedPassword]
  );
  return result.insertId; 
}

export async function getAllUsers() {
  const [rows] = await db.query("SELECT id, userName, email FROM users");
  return rows; 
}

export async function getUserById(id) {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
}

export async function updateUser(id, userName, email, password) {
  let query = "UPDATE users SET userName = ?, email = ?";
  const values = [userName, email];

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query += ", password = ?";
    values.push(hashedPassword);
  }

  query += " WHERE id = ?";
  values.push(id);

  const [result] = await db.query(query, values);
  return result.affectedRows;
}

export async function deleteUser(id) {
  const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
  return result.affectedRows;
}

export async function getUserByEmail(email) {
  const [rows] = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
}
