import { db } from "../config/db.js";

export async function getWalletByUser(userId) {
  const [rows] = await db.query(
    "SELECT * FROM wallet WHERE user_id = ? ORDER BY created_at DESC",
    [userId]
  );
  return rows;
}

export async function addTransaction(userId, amount, type) {
  const [result] = await db.query(
    "INSERT INTO wallet (user_id, amount, type) VALUES (?, ?, ?)",
    [userId, amount, type]
  );
  return result.insertId;
}

export async function getBalance(userId) {
  const [rows] = await db.query(
    "SELECT SUM(amount) AS balance FROM wallet WHERE user_id = ?",
    [userId]
  );
  return rows[0].balance || 0;
}
