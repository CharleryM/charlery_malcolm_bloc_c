import express from "express";
import * as walletController from "../controllers/walletController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", authenticate, walletController.getWallet);
router.get("/transactions", authenticate, walletController.getWalletTransactions);

export default router;