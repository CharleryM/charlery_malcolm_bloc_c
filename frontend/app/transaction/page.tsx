"use client";

import styles from "../../styles/transaction.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/api";
import { useAuthGuard } from "@/lib/authGuard";

export default function TransactionPage() {
  useAuthGuard();

  const router = useRouter();
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<"debit" | "credit">("debit");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (amount === "" || amount <= 0) {
      setError("Montant invalide");
      return;
    }

    try {
      await authFetch("/transaction", {
        method: "POST",
        body: JSON.stringify({ amount, type }),
      });

      router.push("/");
    } catch {
      setError("Erreur lors de la transaction");
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nouvelle transaction</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label>Montant</label>
            <input
              type="number"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          <div className={styles.field}>
            <label>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "debit" | "credit")}
            >
              <option value="debit">Débit</option>
              <option value="credit">Crédit</option>
            </select>
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </main>
  );
}
