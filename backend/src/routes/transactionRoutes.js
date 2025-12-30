import express from "express";
import * as transactionController from "../controllers/transactionController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticate, transactionController.createTransaction);

export default router;