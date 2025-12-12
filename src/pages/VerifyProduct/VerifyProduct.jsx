import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Camera, Monitor, AlertTriangle } from 'lucide-react';
import QrReader from 'react-qr-scanner';
import styles from './VerifyProduct.module.css';

function VerifyProduct() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [productId, setProductId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [cameraError, setCameraError] = useState('');

  // Auto-detection of device type
  useEffect(() => {
    const checkDevice = () => {
      // Heuristic: Check specifically for "mobile" in user agent or small screen width
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768; // Common tablet/mobile breakpoint
      setIsMobile(isMobileDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Handle URL query params (e.g., from scanning a code outside the app)
  useEffect(() => {
    const queryProductId = searchParams.get('productId');
    if (queryProductId) {
      navigate(`/result/${queryProductId}`);
    }
  }, [searchParams, navigate]);

  const handleScan = (data) => {
    if (data) {
      console.log("Scanned Data:", data);
      setIsScanning(false);
      
      try {
        // The QR code usually contains a URL like "http://.../verify?productId=XYZ"
        // We can try to parse the URL object, or just look for the param
        const text = data.text || data; // react-qr-scanner returns object with 'text'
        
        let idToVerify = text;
        
        if (text.includes("productId=")) {
           const url = new URL(text);
           idToVerify = url.searchParams.get("productId");
        } else if (text.includes("/result/")) {
           // Handle direct result links if any
           const parts = text.split("/result/");
           idToVerify = parts[1];
        }

        if (idToVerify) {
           navigate(`/result/${idToVerify}`);
        } else {
           alert("Invalid QR Code format. Could not find Product ID.");
        }

      } catch (e) {
        console.error("Scan parse error", e);
        // Fallback: assume the whole text is the ID if it's alphanumeric
        navigate(`/result/${data.text || data}`);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setCameraError("Camera access denied or not available. Please ensure you are on HTTPS or localhost.");
    setIsScanning(false);
  };

  const startScanning = () => {
    if (!isMobile) {
      alert("Please use a mobile device to scan.");
      return;
    }
    setIsScanning(true);
    setCameraError('');
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
              Scan the QR code on your product to verify authenticity
            </p>
          </div>

          <div className={styles.scanSection}>
             {!isMobile ? (
                 <div className={styles.desktopWarning}>
                    <Monitor size={48} className={styles.warningIcon} />
                    <h3>Desktop Detected</h3>
                    <p>Scanning is optimized for mobile devices with a rear camera.</p>
                    <p className={styles.smallNote}>Please open this page on your phone to scan.</p>
                 </div>
             ) : (
                <div className={styles.scannerWrapper}>
                  {isScanning ? (
                    <div className={styles.cameraView}>
                       <QrReader
                          delay={300}
                          onError={handleError}
                          onScan={handleScan}
                          style={{ width: '100%', height: '100%' }}
                          className={styles.videoElement}
                          constraints={{
                            video: { facingMode: "environment" } // Prefer rear camera
                          }}
                       />
                       <div className={styles.overlayText}>Scanning...</div>
                       <button className={styles.stopBtn} onClick={() => setIsScanning(false)}>Stop</button>
                    </div>
                  ) : (
                    <div className={styles.scannerPlaceholder} onClick={startScanning}>
                      {cameraError ? (
                        <div style={{color: '#ff6b6b'}}>
                            <AlertTriangle size={48} />
                            <p>{cameraError}</p>
                        </div>
                      ) : (
                         <>
                            <Camera size={64} />
                            <p>Tap to Open Camera</p>
                         </>
                      )}
                    </div>
                  )}
                </div>
             )}

            {isMobile && !isScanning && (
                <button
                className={styles.scanBtn}
                onClick={startScanning}
                >
                <Camera size={20} />
                Start Scanner
                </button>
            )}
          </div>

          {/* 
          <div className={styles.divider}>
            <span>OR</span>
          </div>

          <div className={styles.manualSection}>
             // MANUAL INPUT HIDDEN AS REQUESTED
          </div> 
          */}

          <div className={styles.infoBox}>
            <h4>How to verify</h4>
            <ul>
              <li>Point your camera at the QR code on the product label</li>
              <li>Wait for the scanner to detect the certificate</li>
              <li>You will be redirected to the verification result</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifyProduct;
