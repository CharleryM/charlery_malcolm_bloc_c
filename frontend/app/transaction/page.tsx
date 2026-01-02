"use client";

import form from '../../styles/form.module.css'
import transaction from '../../styles/transaction.module.css'
import home from "../../styles/home.module.css";
import Image from "next/image";
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
    <main className={home.container}>
      {/* Header */}
      <header className={transaction.header}>
        <a href="/" className={home.logo}>
          <Image
            src="/images/logo_digital_wallet.png"
            alt="Digital Wallet Logo"
            width={75}
            height={75}
          />
        </a>
      </header>
      
      <div className={transaction.container}>
      <div className={form.card}>
        <h1 className={form.title}>Niew transaction</h1>

        <form className={form.form} onSubmit={handleSubmit}>
          <div className={form.form}>
            <label htmlFor="amount" className={form.label}>Amount</label>
            <input
              id="amount"
              type="number"
              className={form.input}
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          <div className={form.field}>
            <label className={form.label}>Type</label>
            <select
              className={form.select}
              value={type}
              onChange={(e) => setType(e.target.value as "debit" | "credit")}
            >
              <option value="debit">Débit</option>
              <option value="credit">Crédit</option>
            </select>
          </div>

          {error && <p className={form.error}>{error}</p>}

          <button className={form.button} type="submit">
            Send
          </button>

        </form>
        </div>
      </div>
    </main>
  );
}