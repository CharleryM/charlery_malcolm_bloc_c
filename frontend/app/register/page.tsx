"use client";

// import styles from "../../styles/transaction.module.css";
import styles from '../../styles/form.module.css'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register, login } from "@/lib/auth";
import Link from "next/link";

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
      await register(userName, email, password);
      await login(email, password);
      router.push("/");
    } catch {
      setError("Erreur lors de l'inscription");
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sing up</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">user name</label>
            <input
              id="username"
              type="text"
              className={styles.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">password</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirme password</label>
            <input
              id="confirmPassword"
              type="password"
              className={styles.input}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.spaceBetweenButtons}>
            <button className={styles.button} type="submit">
              sign up
            </button>
            <Link href="/login">
              <button className={styles.button}>login</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
