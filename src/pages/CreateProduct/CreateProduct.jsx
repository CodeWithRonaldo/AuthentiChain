import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Upload, Loader } from 'lucide-react';
import styles from './CreateProduct.module.css';
import { useMetaplex } from '../../hooks/useMetaplex';
import { useWallet } from '@solana/wallet-adapter-react';
import { uploadToPinata, uploadMetadataToPinata } from '../../utils/pinata';

function CreateProduct() {
  const navigate = useNavigate();
  const { metaplex: mx } = useMetaplex();
  const wallet = useWallet();
  
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(""); // To show specific progress
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    serial: '',
    description: '',
    imageUrl: '', // We can still allow manual URL
    imageFile: null // For actual file upload
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        imageFile: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!wallet.connected || !wallet.publicKey) {
      alert("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setUploadStatus("Starting creation...");

    try {
      console.log("Minting NFT for:", formData.name);

      let imageUri = formData.imageUrl;

      // 1. Upload Image to Pinata (if file exists)
      if (formData.imageFile) {
        setUploadStatus("Uploading image to Pinata...");
        const imageResult = await uploadToPinata(formData.imageFile);
        imageUri = `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${imageResult.IpfsHash}`;
        console.log("Image uploaded:", imageUri);
      }

      if (!imageUri) {
        throw new Error("Please provide an image URL or upload a file.");
      }

      // 2. Upload Metadata to Pinata
      setUploadStatus("Uploading metadata to Pinata...");
      const attributes = [
        { trait_type: "Category", value: formData.category },
        { trait_type: "Serial", value: formData.serial }
      ];

      const metadataResult = await uploadMetadataToPinata(
        formData.name,
        formData.description,
        imageUri,
        attributes
      );
      
      const metadataUri = `https://${import.meta.env.VITE_PINATA_GATEWAY}/ipfs/${metadataResult.IpfsHash}`;
      console.log("Metadata uploaded:", metadataUri);

      // 3. Create NFT on Solana
      setUploadStatus("Minting on Solana...");
      const { nft } = await mx
        .nfts()
        .create({
          uri: metadataUri,
          name: formData.name,
          sellerFeeBasisPoints: 500, // 5%
        });

      console.log('Minted NFT:', nft.address.toString());
      alert('Product Certificate Created! Mint: ' + nft.address.toString());
      
      navigate('/brand');

    } catch (error) {
      console.error("Minting failed:", error);
      alert("Minting failed: " + error.message);
    } finally {
      setLoading(false);
      setUploadStatus("");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.backBtn}
          onClick={() => navigate('/brand')}
          disabled={loading}
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>
      </header>

      <main className={styles.main}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <div className={styles.iconWrapper}>
              <Package size={32} />
            </div>
            <h1 className={styles.title}>Create Product Certificate</h1>
            <p className={styles.subtitle}>
              Issue a new on-chain certificate for your product
            </p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g., Solana Headphones V1"
                required
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="category" className={styles.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
                required
                disabled={loading}
              >
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Luxury">Luxury Goods</option>
                <option value="Collectibles">Collectibles</option>
                <option value="Accessories">Accessories</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="serial" className={styles.label}>
                Serial Number
              </label>
              <input
                type="text"
                id="serial"
                name="serial"
                value={formData.serial}
                onChange={handleChange}
                className={styles.input}
                placeholder="e.g., SH-2024-001"
                required
                disabled={loading}
              />
              <span className={styles.hint}>
                Unique identifier for this product
              </span>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Add product details, specifications, or notes..."
                rows={4}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imageUrl" className={styles.label}>
                Product Image (Upload File)
              </label>
              <div className={styles.imageInput}>
                 <input
                  type="file"
                  id="imageFile"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
                {/* 
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                /> 
                */}
                <div 
                  className={styles.uploadZone}
                  onClick={() => document.getElementById('imageFile').click()}
                  style={{ 
                    border: '2px dashed rgba(255,255,255,0.2)', 
                    borderRadius: '8px',
                    padding: '2rem',
                    width: '100%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Upload size={32} color="#14f195" />
                  <span>
                    {formData.imageFile 
                      ? `Selected: ${formData.imageFile.name}` 
                      : "Click to upload product image"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.infoBox}>
              <h4>What happens next?</h4>
              <ul>
                <li>Image & Metadata will be uploaded to IPFS (Pinata)</li>
                <li>A unique certificate NFT will be minted on Solana</li>
                <li>The certificate will be stored on the blockchain</li>
              </ul>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate('/brand')}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? (
                   <span style={{display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'}}>
                     <Loader size={18} className={styles.spin} /> 
                     {uploadStatus || "Processing..."}
                   </span>
                ) : 'Create Certificate'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateProduct;
