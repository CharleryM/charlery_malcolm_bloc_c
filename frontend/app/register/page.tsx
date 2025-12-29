"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "@/lib/auth";
import { userAgentFromString } from "next/server";

export default function RegisterPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (password !== confirm) {
    setError("Les mots de passe ne correspondent pas");
    return;
  }

  try {
    // 1️⃣ créer l'utilisateur
    await register(userName, email, password);

    // 2️⃣ login automatique pour récupérer le token
    const loginData = await login(email, password);
    localStorage.setItem("token", loginData.token);

    // 3️⃣ redirection vers le dashboard
    router.push("/dashboard");
  } catch {
    setError("Erreur lors de l'inscription ou de la connexion");
  }
}


  return (
    <main>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmer mot de passe"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">Créer un compte</button>
      </form>
    </main>
  );
}
