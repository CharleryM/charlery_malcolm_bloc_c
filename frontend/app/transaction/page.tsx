"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TransactionPage() {
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const submit = () => {
    localStorage.setItem("transaction", amount);
    router.push("/");
  };

  return (
    <main>
      <h1>Nouvelle transaction</h1>

      <input
        type="number"
        placeholder="Montant (+ ou -)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={submit}>
        Valider
      </button>
    </main>
  );
}
