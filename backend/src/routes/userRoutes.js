import express from "express";
import * as UserController from "../controllers/userController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// utilisateur connecté
router.get("/me", authenticate, UserController.getMe);
router.put("/me", authenticate, UserController.updateUser);
router.delete("/me", authenticate, UserController.deleteUser);

// (optionnel) admin
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

export default router;
