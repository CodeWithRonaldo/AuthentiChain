import { X, Download } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './QRCodeDisplay.module.css';

function QRCodeDisplay({ productId, productName, serial, onClose }) {
  const qrValue = `${window.location.origin}/verify?productId=${productId}`;

  const handleDownload = () => {
    const svg = document.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      canvas.width = 320;
      canvas.height = 320;

      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `qr-${serial}.png`;
        link.href = url;
        link.click();
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>Product QR Code</h2>
          <p className={styles.productName}>{productName}</p>
          <p className={styles.serial}>Serial: {serial}</p>

          <div className={styles.qrContainer}>
            <QRCodeSVG
              value={qrValue}
              size={280}
              level="H"
              includeMargin={true}
              className={styles.qrCode}
            />
          </div>

          <div className={styles.instructions}>
            <p>Scan this QR code to verify product authenticity</p>
          </div>

          <button className={styles.downloadBtn} onClick={handleDownload}>
            <Download size={20} />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  );
}

export default QRCodeDisplay;
