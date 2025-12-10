import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Plus, ArrowLeft, Wallet } from "lucide-react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./BrandDashboard.module.css";
import WalletConnectButton from "../../components/WalletConnectButton/WalletConnectButton";
import { useSolana } from "../../components/SolanaProvider";

function BrandDashboard() {
  const navigate = useNavigate();
  const { connected } = useSolana();
  const [products] = useState([
    {
      id: "1",
      name: "Solana Headphones V1",
      category: "Electronics",
      serial: "SH-2024-001",
      createdAt: "2024-12-01",
      status: "active",
      imageUrl:
        "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    },
    {
      id: "2",
      name: "Premium Sneakers",
      category: "Fashion",
      serial: "PS-2024-042",
      createdAt: "2024-12-03",
      status: "active",
      imageUrl:
        "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    },
  ]);



  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate("/")}>
          <ArrowLeft size={20} />
          Back
        </button>

        <div className={styles.brandInfo}>
          <Package size={24} />
          <span>Brand Dashboard</span>
        </div>

        <WalletConnectButton />

        {/* {!isWalletConnected ? (
          <button
            className={styles.walletBtn}
            onClick={handleConnectWallet}
          >
            <Wallet size={20} />
            Connect Wallet
          </button>
        ) : (
          <div className={styles.walletConnected}>
            <div className={styles.walletDot}></div>
            <span>Connected</span>
          </div>
        )} */}
      </header>

      <main className={styles.main}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={styles.title}>Your Products</h1>
            <p className={styles.subtitle}>
              Manage your product certificates and track verification activity
            </p>
          </div>
          <button
            className={styles.createBtn}
            onClick={() => navigate("/brand/create")}
            disabled={!connected}
          >
            <Plus size={20} />
            Create Product
          </button>
        </div>

        {!connected ? (
          <div className={styles.emptyState}>
            <Wallet size={64} />
            <h2>Connect Your Wallet</h2>
            <p>Connect your Solana wallet to manage product certificates</p>
            <div className={styles.buttonWrapper}>
               <WalletConnectButton />
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className={styles.emptyState}>
            <Package size={64} />
            <h2>No Products Yet</h2>
            <p>Create your first product certificate to get started</p>
            <button
              className={styles.connectBtn}
              onClick={() => navigate("/brand/create")}
            >
              <Plus size={20} />
              Create Product
            </button>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {connected && products.length > 0 && (
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.statValue}>{products.length}</div>
              <div className={styles.statLabel}>Total Products</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>
                {products.filter((p) => p.status === "active").length}
              </div>
              <div className={styles.statLabel}>Active Certificates</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statValue}>0</div>
              <div className={styles.statLabel}>Total Scans</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default BrandDashboard;
