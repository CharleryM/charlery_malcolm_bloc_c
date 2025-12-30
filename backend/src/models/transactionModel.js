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
    "SELECT * FROM transactions WHERE wallet_id = ?",
    [walletId]
  );

  return rows.map(tx => ({
    ...tx,
    amount: Number(tx.amount),
    delta: tx.type === "credit" ? Number(tx.amount) : -Number(tx.amount),
  }));
}
