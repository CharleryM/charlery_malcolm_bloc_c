import express from "express";
import * as transactionController from "../controllers/transactionController.js";

const router = express.Router();

router.post("/:userId", transactionController.createTransaction);

export default router;