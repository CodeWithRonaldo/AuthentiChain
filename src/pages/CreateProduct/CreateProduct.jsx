import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Upload } from 'lucide-react';
import styles from './CreateProduct.module.css';

function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    serial: '',
    description: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/brand');
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
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="imageUrl" className={styles.label}>
                Product Image URL (Optional)
              </label>
              <div className={styles.imageInput}>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="https://example.com/image.jpg"
                />
                <button type="button" className={styles.uploadBtn}>
                  <Upload size={18} />
                  Upload
                </button>
              </div>
            </div>

            <div className={styles.infoBox}>
              <h4>What happens next?</h4>
              <ul>
                <li>A unique certificate NFT will be minted on Solana</li>
                <li>A QR code will be generated for product verification</li>
                <li>The certificate will be stored on the blockchain</li>
              </ul>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => navigate('/brand')}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={styles.submitBtn}
              >
                Create Certificate
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default CreateProduct;
