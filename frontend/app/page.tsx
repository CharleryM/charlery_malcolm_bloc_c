"use client";

import home from "../styles/home.module.css";
import styles from '../styles/form.module.css'
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
    return <p className={home.error}>{error}</p>;
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
    <div className={home.container}>
      {/* Header */}
      <header className={home.header}>
        <a href="/" className={home.logo}>
          <Image
            src="/images/logo_digital_wallet.png"
            alt="Digital Wallet Logo"
            width={75}
            height={75}
          />
        </a>
        <button className={home.logo} onClick={handleLogout}>
          <p>logout</p>
        </button>
      </header>

      <div className="main">
        {/* Balance */}
        <section className={home.balance}>
          <h1>${wallet.balance.toFixed(2)}</h1>
        </section>

        {/* Assets */}
        <section className={home.assets}>
          <h2>Assets</h2>
          <ul>
            {transactions.map((tx) => (
              <li key={tx.id} className={home.asset}>
                <div className={home.assetLeft}>
                  <div className={home.ethIcon}></div>
                  <div>
                    <strong>Ethereum</strong>
                  </div>
                </div>

                <div className={home.assetRight}>
                  <strong
                    className={
                      tx.type === "credit" ? home.positive : home.negative
                    }
                  >
                    ${tx.delta.toFixed(2)}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Actions */}
        <footer className={home.actions}>
          <div className={home["grid-column-5"]}></div>
          <div className={home["grid-column-2"]}>
            <Link href="/transaction">
              <button className={styles.button}>send money</button>
            </Link>
          </div>
          <div className={home["grid-column-5"]}></div>
        </footer>
      </div>
    </div>
  );
}
