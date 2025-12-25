import * as WalletModel from "../models/walletModel.js";
import * as TransactionModel from "../models/transactionModel.js";

export async function getWallet(req, res) {
  const { userId } = req.params;

  try {
    const wallet = await WalletModel.getWalletByUserId(userId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json(wallet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getWalletTransactions(req, res) {
  const { userId } = req.params;

  try {
    const wallet = await WalletModel.getWalletByUserId(userId);
    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const transactions = await TransactionModel.getTransactionsByWallet(wallet.id);
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
