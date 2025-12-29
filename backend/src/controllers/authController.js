import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as UserModel from "../models/userModel.js";
import * as WalletModel from "../models/walletModel.js";


export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    const user = await UserModel.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Identifiants invalides" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true en HTTPS
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Connexion réussie",
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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

