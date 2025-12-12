import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, Package, Calendar, MapPin, Loader, ExternalLink } from 'lucide-react';
import styles from './VerificationResult.module.css';
import { useMetaplex } from '../../hooks/useMetaplex';
import { PublicKey } from '@solana/web3.js';

function VerificationResult() {
  const navigate = useNavigate();
  const { mintAddress } = useParams();
  const { metaplex: mx } = useMetaplex();

  const [status, setStatus] = useState('loading'); // loading, genuine, suspicious, invalid
  const [productData, setProductData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const verifyProduct = async () => {
      try {
        // Basic validation of mint address format
        try {
          new PublicKey(mintAddress);
        } catch (e) {
          setStatus('invalid');
          setErrorMsg("Invalid Product ID format.");
          return;
        }

        const mintPubkey = new PublicKey(mintAddress);
        console.log("Verifying Mint:", mintAddress);
        console.log("RPC Endpoint:", mx.connection.rpcEndpoint);

        // 1. Check if Mint Account exists at all
        const mintInfo = await mx.connection.getAccountInfo(mintPubkey);
        if (!mintInfo) {
          throw new Error("Mint Account not found on " + (mx.connection.rpcEndpoint.includes("devnet") ? "Devnet" : "Network"));
        }
        console.log("Mint Account found. Owner:", mintInfo.owner.toString());

        // 2. Try to find Metadata
        const nft = await mx.nfts().findByMint({ mintAddress: mintPubkey });

        console.log("NFT Found:", nft);
        
        let metadata = nft.json;
        if (!metadata && nft.uri) {
             try {
               const response = await fetch(nft.uri).catch(() => null);
               if (response && response.ok) {
                 metadata = await response.json();
               }
             } catch (e) {
               console.warn("Failed to fetch metadata URI");
             }
        }

        setProductData({
            name: nft.name,
            image: metadata?.image,
            serial: metadata?.attributes?.find(a => a.trait_type === 'Serial')?.value || "N/A",
            category: metadata?.attributes?.find(a => a.trait_type === 'Category')?.value || "Unknown",
            mint: nft.address.toString(),
            owner: nft.updateAuthorityAddress.toString() // In a real app, you'd check if this matches the Brand's wallet
        });
        
        setStatus('genuine');

      } catch (error) {
        console.error("Verification failed:", error);
        setStatus('suspicious');
        // Show actual error for debugging
        setErrorMsg(`Failed to verify ${mintAddress.slice(0, 8)}...: ${error.message}`);
      }
    };

    if (mintAddress && mx) {
      verifyProduct();
    }
  }, [mintAddress, mx]);

  const getStatusConfig = () => {
    switch (status) {
      case 'loading':
        return {
          icon: <Loader size={80} className={styles.spin} />,
          title: 'Verifying...',
          message: 'Checking blockchain records...',
          className: styles.loading,
          details: null
        };
      case 'genuine':
        return {
          icon: <CheckCircle size={80} />,
          title: 'Genuine Product',
          message: 'This product is authentic and verified on the Solana blockchain',
          className: styles.genuine,
          details: productData
        };
      case 'suspicious':
        return {
          icon: <AlertTriangle size={80} />,
          title: 'Suspicious Product',
          message: errorMsg || 'This QR code is not registered in our system',
          className: styles.suspicious,
          details: null
        };
      case 'invalid':
        return {
          icon: <XCircle size={80} />,
          title: 'Invalid ID',
          message: errorMsg,
          className: styles.revoked, // Reusing revoked style for error
          details: null
        };
      default:
        return {
          icon: <AlertTriangle size={80} />,
          title: 'Unknown Status',
          message: 'Unable to verify product',
          className: styles.suspicious,
          details: null
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => navigate('/verify')}
        >
          <ArrowLeft size={20} />
          Verify Another
        </button>
      </header>

      <main className={styles.main}>
        <div className={`${styles.resultCard} ${config.className}`}>
          <div className={styles.iconWrapper}>
            {config.icon}
          </div>

          <h1 className={styles.title}>{config.title}</h1>
          <p className={styles.message}>{config.message}</p>

          {config.details && (
            <div className={styles.details}>
                {config.details.image && (
                    <div className={styles.productImageContainer}>
                        <img src={config.details.image} alt="Product" className={styles.productImage} />
                    </div>
                )}

              <div className={styles.detailSection}>
                <h3>Product Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <Package className={styles.detailIcon} size={20} />
                    <div>
                      <div className={styles.detailLabel}>Product Name</div>
                      <div className={styles.detailValue}>{config.details.name}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Package className={styles.detailIcon} size={20} />
                    <div>
                      <div className={styles.detailLabel}>Category</div>
                      <div className={styles.detailValue}>{config.details.category}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Package className={styles.detailIcon} size={20} />
                    <div>
                      <div className={styles.detailLabel}>Serial Number</div>
                      <div className={styles.detailValue}>{config.details.serial}</div>
                    </div>
                  </div>
                </div>
              </div>
              
               <div className={styles.explorerLink}>
                  <a 
                    href={`https://explorer.solana.com/address/${config.details.mint}?cluster=devnet`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.explorerBtn}
                  >
                    View on Solana Explorer <ExternalLink size={16} />
                  </a>
              </div>
            </div>
          )}

          {!config.details && status !== 'loading' && (
            <div className={styles.warningBox}>
              <h4>What does this mean?</h4>
              <ul>
                <li>The Product ID entered does not exist on the blockchain.</li>
                <li>You may have entered the ID incorrectly.</li>
                <li>This product may be counterfeit.</li>
              </ul>
            </div>
          )}

          <div className={styles.actions}>
            <button
              className={styles.verifyBtn}
              onClick={() => navigate('/verify')}
            >
              Verify Another Product
            </button>
            <button
              className={styles.homeBtn}
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerificationResult;
