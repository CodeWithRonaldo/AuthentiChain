import { useNavigate } from 'react-router-dom';
import { Shield, Scan, Package } from 'lucide-react';
import styles from './LandingPage.module.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <Shield size={32} />
          <span>AuthentiChain</span>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Verify Product Authenticity with Solana</h1>
          <p className={styles.subtitle}>
            Combat counterfeits with blockchain-powered product certificates.
            Scan, verify, and trust in seconds.
          </p>

          <div className={styles.ctaButtons}>
            <button
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => navigate('/verify')}
            >
              <Scan size={20} />
              Scan to Verify
            </button>
            <button
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={() => navigate('/brand')}
            >
              <Package size={20} />
              Brand Dashboard
            </button>
          </div>
        </section>

        <section className={styles.features}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Shield size={40} />
            </div>
            <h3>Blockchain Security</h3>
            <p>Each product gets a unique on-chain certificate stored on Solana</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Scan size={40} />
            </div>
            <h3>Instant Verification</h3>
            <p>Scan QR codes to verify authenticity in real-time</p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <Package size={40} />
            </div>
            <h3>Product Registry</h3>
            <p>Manage your entire product catalog with tamper-proof records</p>
          </div>
        </section>

        <section className={styles.howItWorks}>
          <h2>How It Works</h2>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <h4>Brand Issues Certificate</h4>
              <p>Create on-chain certificates for each product</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <h4>QR Code Generated</h4>
              <p>Unique QR code links to blockchain certificate</p>
            </div>
            <div className={styles.stepArrow}>→</div>
            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <h4>Customer Scans</h4>
              <p>Instant verification of product authenticity</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Built on Solana • Powered by Blockchain Technology</p>
      </footer>
    </div>
  );
}

export default LandingPage;
