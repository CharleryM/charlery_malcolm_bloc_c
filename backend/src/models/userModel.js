import { db } from "../config/database.js";

export async function createUser(name, email, password) {
  const [result] = await db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password]
  );
  return result.insertId; // retourne l'id du nouvel user
}

export async function getAllUsers() {
  const [rows] = await db.query("SELECT id, name, email FROM users");
  return rows; // retourne un tableau d'objets
}

export async function getUserById(id) {
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
}
