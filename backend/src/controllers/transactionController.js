import * as WalletModel from "../models/walletModel.js";
import * as TransactionModel from "../models/transactionModel.js";

export async function createTransaction(req, res) {
  const userId = req.params.userId; // récupéré depuis l'URL
  const { amount, type } = req.body;

  // Validation des champs
  if (!userId || amount == null || type == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // La base de données attend 'credit' / 'debit' (voir sql/init.sql)
  if (!["credit", "debit"].includes(type)) {
    return res.status(400).json({ error: "Invalid transaction type (use 'credit' or 'debit')" });
  }

  const numericAmount = parseFloat(amount);
  if (Number.isNaN(numericAmount) || numericAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    // Récupérer le wallet de l'utilisateur
    const wallet = await WalletModel.getWalletByUserId(userId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    // Créer la transaction
    const transactionId = await TransactionModel.createTransaction(
      wallet.id,
      numericAmount,
      type
    );

    // Mettre à jour le solde: 'credit' augmente, 'debit' diminue
    const signedAmount = type === "credit" ? numericAmount : -numericAmount;
    await WalletModel.updateBalance(wallet.id, signedAmount);

    res.status(201).json({
      message: "Transaction created successfully",
      transactionId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
