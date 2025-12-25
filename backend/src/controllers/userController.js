import * as UserModel from "../models/userModel.js";
import * as WalletModel from "../models/walletModel.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const id = await UserModel.createUser(name, email, password);
    await WalletModel.createWallet(id);
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      id: id
    })
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const affected = await UserModel.updateUser(id, name, email, password);
    if (!affected) return res.status(404).json({ error: "User not found" });
    res.json({ id, name, email, password });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const affected = await UserModel.deleteUser(id);
    if (!affected) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
