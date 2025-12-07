import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Hash } from 'lucide-react';
import styles from './VerifyProduct.module.css';

function VerifyProduct() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      navigate('/result/genuine');
    }, 2000);
  };

  const handleManualVerify = (e) => {
    e.preventDefault();
    if (productId.trim()) {
      navigate('/result/genuine');
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Verify Product</h1>
            <p className={styles.subtitle}>
              Scan the QR code on your product or enter the product ID manually
            </p>
          </div>

          <div className={styles.scanSection}>
            <div className={styles.scannerWrapper}>
              {isScanning ? (
                <div className={styles.scanning}>
                  <div className={styles.scanLine}></div>
                  <Camera size={64} />
                  <p>Scanning...</p>
                </div>
              ) : (
                <div className={styles.scannerPlaceholder}>
                  <Camera size={64} />
                  <p>Point camera at QR code</p>
                </div>
              )}
            </div>

            <button
              className={styles.scanBtn}
              onClick={handleScan}
              disabled={isScanning}
            >
              <Camera size={20} />
              {isScanning ? 'Scanning...' : 'Start Scanning'}
            </button>
          </div>

          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.manualSection}>
            <form onSubmit={handleManualVerify} className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="productId" className={styles.label}>
                  Enter Product ID
                </label>
                <div className={styles.inputWrapper}>
                  <Hash className={styles.inputIcon} size={20} />
                  <input
                    type="text"
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className={styles.input}
                    placeholder="e.g., ABC123XYZ789"
                  />
                </div>
              </div>

              <button
                type="submit"
                className={styles.verifyBtn}
                disabled={!productId.trim()}
              >
                Verify Product
              </button>
            </form>
          </div>

          <div className={styles.infoBox}>
            <h4>How to find the Product ID</h4>
            <ul>
              <li>Look for the QR code on your product label or packaging</li>
              <li>The product ID may also be printed near the QR code</li>
              <li>For digital products, check your purchase confirmation</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifyProduct;
