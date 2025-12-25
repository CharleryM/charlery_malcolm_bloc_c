import { db } from "../config/database.js";

export async function createTransaction(walletId, amount, type) {
  const [result] = await db.query(
    `
    INSERT INTO transactions (wallet_id, amount, type)
    VALUES (?, ?, ?)
    `,
    [walletId, amount, type]
  );

  return result.insertId;
}

export async function getTransactionsByWallet(walletId) {
  const [rows] = await db.query(
    `
    SELECT id, amount, type, created_at
    FROM transactions
    WHERE wallet_id = ?
    ORDER BY created_at DESC
    `,
    [walletId]
  );

  return rows;
}
