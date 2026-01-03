"use client";

import form from '../../styles/form.module.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      await login(email, password); // pose le cookie JWT
      router.push("/");
    } catch {
      setError("Email ou mot de passe incorrect");
    }
  }

  return (
    <main className={form.container}>
      <div className={form.card}>
        <h1 className={form.title}>Connexion</h1>

        <form className={form.form} onSubmit={handleSubmit}>
          <div className={form.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={form.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className={form.field}>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              className={form.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

        {error && <p className={form.error}>{error}</p>}
        <div className={form.spaceBetweenButtons}>
          <button className={form.button} type="submit">login</button>
          <Link href="/register">
            <button className={form.button}>sign up</button>
          </Link>
        </div>
      </form>
    </div>
    </main >
  );
}
