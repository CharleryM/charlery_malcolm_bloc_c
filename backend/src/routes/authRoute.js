import express from "express";
import * as AuthController from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", authenticate, AuthController.login);
router.post("/register",authenticate, AuthController.createUser);
router.post("/logout", authenticate, AuthController.logout);
export default router;
