import { db } from "../config/database.js";

export async function createWallet(userId) {
  const [result] = await db.query(
    "INSERT INTO wallet (user_id, balance) VALUES (?, 0)",
    [userId]
  );
  return result.insertId;
}

export async function getWalletByUser(userId) {
  const [rows] = await db.query(
    "SELECT * FROM wallet WHERE user_id = ?",
    [userId]
  );

  if (!rows[0]) return null;

  return {
    ...rows[0],
    balance: Number(rows[0].balance),
  };
}


export async function updateBalance(walletId, amount) {
  const [result] = await db.query(
    "UPDATE wallet SET balance = balance + ? WHERE id = ?",
    [amount, walletId]
  );
  return result.affectedRows;
}
