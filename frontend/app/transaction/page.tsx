"use client";
import { useState } from "react";
import { updateAsset } from "@/lib/api";

export default function EditForm() {
  const [amount, setAmount] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await updateAsset({ amount });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Modifier</button>
    </form>
  );
}
