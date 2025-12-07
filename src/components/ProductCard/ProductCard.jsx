import { useState } from 'react';
import { QrCode, Calendar, Hash, MoreVertical } from 'lucide-react';
import QRCodeDisplay from '../QRCodeDisplay/QRCodeDisplay';
import styles from './ProductCard.module.css';

function ProductCard({ product }) {
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className={styles.image} />
          ) : (
            <div className={styles.imagePlaceholder}>
              <QrCode size={48} />
            </div>
          )}
          <div className={`${styles.statusBadge} ${styles[product.status]}`}>
            {product.status}
          </div>
        </div>

        <div className={styles.content}>
          <h3 className={styles.productName}>{product.name}</h3>
          <p className={styles.category}>{product.category}</p>

          <div className={styles.details}>
            <div className={styles.detail}>
              <Hash size={16} />
              <span>{product.serial}</span>
            </div>
            <div className={styles.detail}>
              <Calendar size={16} />
              <span>{new Date(product.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.qrBtn}
              onClick={() => setShowQR(true)}
            >
              <QrCode size={18} />
              View QR Code
            </button>
            <button className={styles.menuBtn}>
              <MoreVertical size={18} />
            </button>
          </div>
        </div>
      </div>

      {showQR && (
        <QRCodeDisplay
          productId={product.id}
          productName={product.name}
          serial={product.serial}
          onClose={() => setShowQR(false)}
        />
      )}
    </>
  );
}

export default ProductCard;
