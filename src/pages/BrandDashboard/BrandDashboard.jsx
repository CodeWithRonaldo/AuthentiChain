import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Plus, ArrowLeft, Wallet, Loader, RefreshCw } from "lucide-react";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./BrandDashboard.module.css";
import WalletConnectButton from "../../components/WalletConnectButton/WalletConnectButton";
import { useSolana } from "../../components/SolanaProvider";
import { useMetaplex } from "../../hooks/useMetaplex";
import { useWallet } from "@solana/wallet-adapter-react";

function BrandDashboard() {
  const navigate = useNavigate();
  const { connected } = useSolana();
  const { metaplex: mx } = useMetaplex();
  const wallet = useWallet();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNFTs = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      setProducts([]);
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching NFTs for:", wallet.publicKey.toString());
      const nfts = await mx
        .nfts()
        .findAllByOwner({ owner: wallet.publicKey });
      
      console.log("Found raw NFTs:", nfts);

      const formattedProducts = await Promise.all(nfts.map(async (nft) => {
        let metadata = nft.json;
        if (!metadata && nft.uri) {
            try {
              const response = await fetch(nft.uri).catch(() => null);
              if (response && response.ok) {
                metadata = await response.json();
              }
            } catch (e) {
              console.warn("Failed to fetch metadata for", nft.address.toBase58());
            }
        }

        return {
          id: nft.mintAddress.toString(),
          name: nft.name,
          category: metadata?.attributes?.find(a => a.trait_type === 'Category')?.value || "Unknown",
          serial: metadata?.attributes?.find(a => a.trait_type === 'Serial')?.value || "N/A",
          createdAt: new Date().toISOString(),
          status: "active",
          imageUrl: metadata?.image || "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg", 
        };
      }));

      console.log("Formatted products:", formattedProducts);
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, [wallet.connected, wallet.publicKey, mx]);

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
      </header>

      <main className={styles.main}>
        <div className={styles.dashboardHeader}>
          <div>
            <h1 className={styles.title}>Your Products</h1>
            <p className={styles.subtitle}>
              Manage your product certificates and track verification activity
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={fetchNFTs} 
              className={styles.refreshBtn}
              disabled={loading || !connected}
            >
              <RefreshCw size={20} className={loading ? styles.spin : ''} />
            </button>
            <button
              className={styles.createBtn}
              onClick={() => navigate("/brand/create")}
              disabled={!connected}
            >
              <Plus size={20} />
              Create Product
            </button>
          </div>
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
        ) : loading && products.length === 0 ? (
          <div className={styles.emptyState}>
            <Loader size={48} className={styles.spin} />
            <p>Loading your products from Solana...</p>
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
