import styles from "../../styles/transaction.module.css";
import { useState } from "react";

export default function TransactionPage() {
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<TransactionType>("debit");
  const userId = "123"; // 🔴 à remplacer par le vrai userId

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (amount === "") {
      console.error("Montant invalide");
      return;
    }

    const payload = {
      amount,
      type,
    };

    try {
      const response = await fetch(
        `http://localhost:3001/transaction/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi");
      }

      const data = await response.json();
      console.log("Transaction créée :", data);
    } catch (error) {
      console.error("Erreur :", error);
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Nouvelle transaction</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Montant</label>
            <input
              type="number"
              className={styles.input}
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value === "" ? "" : Number(e.target.value))
              }
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Type</label>
            <select
              className={styles.select}
              value={type}
              onChange={(e) =>
                setType(e.target.value as TransactionType)
              }
            >
              <option value="debit">Débit</option>
              <option value="credit">Crédit</option>
            </select>
          </div>

          <button className={styles.button} type="submit">
            Envoyer
          </button>
        </form>
      </div>
    </main>
  );
}