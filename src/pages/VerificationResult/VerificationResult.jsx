import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle, XCircle, AlertTriangle, ArrowLeft, Package, Calendar, MapPin } from 'lucide-react';
import styles from './VerificationResult.module.css';

function VerificationResult() {
  const navigate = useNavigate();
  const { status } = useParams();

  const getStatusConfig = () => {
    switch (status) {
      case 'genuine':
        return {
          icon: <CheckCircle size={80} />,
          title: 'Genuine Product',
          message: 'This product is authentic and verified on the blockchain',
          className: styles.genuine,
          details: {
            brand: 'Premium Brand Co.',
            productName: 'Solana Headphones V1',
            serial: 'SH-2024-001',
            manufactured: 'December 1, 2024',
            firstScan: 'December 5, 2024',
            location: 'San Francisco, CA'
          }
        };
      case 'suspicious':
        return {
          icon: <AlertTriangle size={80} />,
          title: 'Suspicious Product',
          message: 'This QR code is not registered in our system',
          className: styles.suspicious,
          details: null
        };
      case 'revoked':
        return {
          icon: <XCircle size={80} />,
          title: 'Revoked Certificate',
          message: 'This product has been flagged by the brand',
          className: styles.revoked,
          details: {
            brand: 'Premium Brand Co.',
            productName: 'Solana Headphones V1',
            serial: 'SH-2024-001',
            revokedDate: 'December 4, 2024',
            reason: 'Reported as stolen'
          }
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
              <div className={styles.detailSection}>
                <h3>Product Information</h3>
                <div className={styles.detailGrid}>
                  <div className={styles.detailItem}>
                    <Package className={styles.detailIcon} size={20} />
                    <div>
                      <div className={styles.detailLabel}>Brand</div>
                      <div className={styles.detailValue}>{config.details.brand}</div>
                    </div>
                  </div>

                  <div className={styles.detailItem}>
                    <Package className={styles.detailIcon} size={20} />
                    <div>
                      <div className={styles.detailLabel}>Product</div>
                      <div className={styles.detailValue}>{config.details.productName}</div>
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

              {status === 'genuine' && (
                <div className={styles.detailSection}>
                  <h3>Verification Details</h3>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <Calendar className={styles.detailIcon} size={20} />
                      <div>
                        <div className={styles.detailLabel}>Manufactured</div>
                        <div className={styles.detailValue}>{config.details.manufactured}</div>
                      </div>
                    </div>

                    <div className={styles.detailItem}>
                      <Calendar className={styles.detailIcon} size={20} />
                      <div>
                        <div className={styles.detailLabel}>First Scanned</div>
                        <div className={styles.detailValue}>{config.details.firstScan}</div>
                      </div>
                    </div>

                    <div className={styles.detailItem}>
                      <MapPin className={styles.detailIcon} size={20} />
                      <div>
                        <div className={styles.detailLabel}>Location</div>
                        <div className={styles.detailValue}>{config.details.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {status === 'revoked' && (
                <div className={styles.detailSection}>
                  <h3>Revocation Details</h3>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <Calendar className={styles.detailIcon} size={20} />
                      <div>
                        <div className={styles.detailLabel}>Revoked Date</div>
                        <div className={styles.detailValue}>{config.details.revokedDate}</div>
                      </div>
                    </div>

                    <div className={styles.detailItem}>
                      <AlertTriangle className={styles.detailIcon} size={20} />
                      <div>
                        <div className={styles.detailLabel}>Reason</div>
                        <div className={styles.detailValue}>{config.details.reason}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!config.details && (
            <div className={styles.warningBox}>
              <h4>What should I do?</h4>
              <ul>
                <li>Double-check the QR code on your product</li>
                <li>Verify you're scanning an official product label</li>
                <li>Contact the seller or brand for verification</li>
                <li>Report suspicious products to prevent fraud</li>
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
