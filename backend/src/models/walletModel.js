import { db } from "../config/database.js";

export async function createWallet(userId) {
  const [result] = await db.query(
    "INSERT INTO wallet (user_id, balance) VALUES (?, 0)",
    [userId]
  );

  return result.insertId;
}

export async function getWalletByUserId(userId) {
  const [rows] = await db.query(
    "SELECT * FROM wallet WHERE user_id = ?",
    [userId]
  );

  return rows[0];
}

export async function updateBalance(walletId, amount) {
  const [result] = await db.query(
    "UPDATE wallet SET balance = balance + ? WHERE id = ?",
    [amount, walletId]
  );

  return result.affectedRows;
}