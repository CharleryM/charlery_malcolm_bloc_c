import * as UserModel from "../models/userModel.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    const id = await UserModel.createUser(name, email, password);
    res.status(201).json({ id, name, email });
  } catch (err) {
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
  const { name, email } = req.body;
  try {
    const affected = await UserModel.updateUser(id, name, email);
    if (!affected) return res.status(404).json({ error: "User not found" });
    res.json({ id, name, email });
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
