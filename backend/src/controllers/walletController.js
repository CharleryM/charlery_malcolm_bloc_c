import * as WalletModel from "../models/walletModel.js";
import * as TransactionModel from "../models/transactionModel.js";

export async function getWallet(req, res) {
  try {
    const wallet = await WalletModel.getWalletByUser(req.user.id);

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    res.json({
      ...wallet,
      balance: Number(wallet.balance),
      cryptoBalance: Number(wallet.cryptoBalance),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getWalletTransactions(req, res) {
  try {
    const wallet = await WalletModel.getWalletByUser(req.user.id);

    if (!wallet) {
      return res.status(404).json({ error: "Wallet not found" });
    }

    const transactions =
      await TransactionModel.getTransactionsByWallet(wallet.id);

    const normalizedTransactions = transactions.map(tx => ({
      ...tx,
      amount: Number(tx.amount),
      delta: Number(tx.delta),
    }));

    res.json(normalizedTransactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}