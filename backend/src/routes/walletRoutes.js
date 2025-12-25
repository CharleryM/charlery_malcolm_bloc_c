import express from "express";
import * as walletController from "../controllers/walletController.js";

const router = express.Router();


router.get("/:userId", walletController.getWallet);
router.get("/:userId/transactions", walletController.getWalletTransactions);

export default router;