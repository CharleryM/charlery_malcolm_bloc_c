"use client";

import styles from "../styles/home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";
import { useAuthGuard } from "@/lib/authGuard";

type Wallet = {
  balance: number;
  cryptoBalance: number;
};

type Transaction = {
  id: number;
  amount: number;
  type: "credit" | "debit";
  delta: number;
};

export default function Page() {
  useAuthGuard();

  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const walletData = await authFetch("/wallet");
        const txData = await authFetch("/wallet/transactions");

        setWallet({
          ...walletData,
          balance: Number(walletData.balance),
          cryptoBalance: Number(walletData.cryptoBalance),
        });

        setTransactions(txData);
      } catch (err: any) {
        console.error("Erreur chargement dashboard", err);
        setError(err.message || "Erreur lors du chargement du dashboard");
      } finally {
        setLoading(false);
      }
    }


    loadDashboard();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!wallet) {
    return <p>Wallet non trouvé.</p>;
  }

  async function handleLogout() {
  try {
    await authFetch("/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  } catch (err) {
    console.error("Erreur logout", err);
  }
}


  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <a href="/" className={styles.logo}>
          <Image
            src="/images/logo_digital_wallet.png"
            alt="Digital Wallet Logo"
            width={75}
            height={75}
          />
        </a>
        <button className={styles.logo} onClick={handleLogout}>
          <p>logout</p>
        </button>
      </header>

      <div className="main">
        {/* Balance */}
        <section className={styles.balance}>
          <h1>${wallet.balance.toFixed(2)}</h1>
        </section>

        {/* Assets */}
        <section className={styles.assets}>
          <h2>Assets</h2>
          <ul>
            {transactions.map((tx) => (
              <li key={tx.id} className={styles.asset}>
                <div className={styles.assetLeft}>
                  <div className={styles.ethIcon}></div>
                  <div>
                    <strong>Ethereum</strong>
                  </div>
                </div>

                <div className={styles.assetRight}>
                  <strong>${tx.amount.toFixed(2)}</strong>
                  <p
                    className={
                      tx.type === "credit" ? styles.positive : styles.negative
                    }
                  >
                    {tx.type === "credit" ? "+" : "-"} ${tx.delta.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <footer className={styles.actions}>
          <div className={styles["grid-column-5"]}></div>
          <div className={styles["grid-column-2"]}>
            <Link href="/transaction">
              <button className={styles.send}>Send Money</button>
            </Link>
          </div>
          <div className={styles["grid-column-5"]}></div>
        </footer>
      </div>
    </div>
  );
}
