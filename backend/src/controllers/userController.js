import * as UserModel from "../models/userModel.js";
import * as WalletModel from "../models/walletModel.js";

export async function getAllUsers(req, res) {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await UserModel.getUserById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
   const { name, email, password } = req.body;

  try {
    const affected = await UserModel.updateUser(
      req.user.id,
      name,
      email,
      password
    );

    if (!affected) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Profil mis à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const affected = await UserModel.deleteUser(req.user.id);

    if (!affected) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "Compte supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getMe(req, res) {
  try {
    const user = await UserModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
