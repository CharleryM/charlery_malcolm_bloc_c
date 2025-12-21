import styles from "../styles/home.module.css";
import { getAsset} from "@lib/api";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
        <button className={styles.logo}>
          <Image
            src="/images/menu.png"
            alt="Digital Wallet Logo"
            width={50}
            height={50}
          />
        </button>
      </header>

      <div className="main">
        {/* Balance */}
        <section className={styles.balance}>
          <h1>$404.18</h1>
          <p>1.02 ETH</p>
        </section>

        {/* Assets */}
        <section className={styles.assets}>
          <h2>Assets</h2>
          <ul>
            <li>
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div key={i} className={styles.asset}>
                  <div className={styles.assetLeft}>
                    <div className={styles.ethIcon}></div>
                    <div>
                      <strong>Ethereum</strong>
                      <p>1.02 ETH</p>
                    </div>
                  </div>

                  <div className={styles.assetRight}>
                    <strong>$404.18</strong>
                    <p className={styles.positive}>+ $24.50</p>
                  </div>
                </div>
              ))}
            </li>
          </ul>
        </section>

        {/* Actions */}
        <footer className={styles.actions}>
          <button className={styles.send}>
            <Link href="/transaction">
              Send Money
            </Link>
          </button>
        </footer>
      </div>
    </div>
  );
}
