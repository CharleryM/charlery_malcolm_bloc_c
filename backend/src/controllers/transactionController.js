import * as WalletModel from "../models/walletModel.js";
import * as TransactionModel from "../models/transactionModel.js";

export async function createTransaction(req, res) {
  const userId = req.user.id; 
  const { amount, type } = req.body;

  if (amount == null || type == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!["credit", "debit"].includes(type)) {
    return res.status(400).json({
      error: "Invalid transaction type (use 'credit' or 'debit')",
    });
  }

  const numericAmount = Number(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const wallet = await WalletModel.getWalletByUser(req.user.id);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const transactionId = await TransactionModel.createTransaction(
      wallet.id,
      numericAmount,
      type
    );

    const signedAmount = type === "credit"
      ? numericAmount
      : -numericAmount;

    await WalletModel.updateBalance(wallet.id, signedAmount);

    res.status(201).json({
      message: "Transaction created successfully",
      transactionId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
