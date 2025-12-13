# AuthentiChain

A blockchain-based product authentication system built on Solana that enables brands to mint NFT certificates for their products and allows consumers to verify product authenticity in real-time.

## 🌟 Project Overview

AuthentiChain leverages blockchain technology to combat counterfeit products by creating immutable, verifiable digital certificates for physical goods. Each product receives a unique NFT certificate stored on the Solana blockchain, providing a transparent and tamper-proof authentication mechanism.

## 📋 About

AuthentiChain is a decentralized application (dApp) that bridges the gap between physical products and blockchain technology. Brands can create digital certificates for their products, while consumers can instantly verify authenticity by scanning QR codes. All certificates are stored on Solana's high-performance blockchain, ensuring fast, low-cost, and permanent verification records.

## ✨ Core Features

### For Brands
- **NFT Certificate Minting**: Create unique blockchain certificates for products
- **Product Management Dashboard**: View and manage all minted product certificates
- **IPFS Storage Integration**: Product images and metadata stored on Pinata (IPFS)
- **QR Code Generation**: Automatic QR code creation for each product certificate
- **Real-time Tracking**: Monitor all products and their verification status

### For Consumers
- **QR Code Scanning**: Scan product QR codes using mobile camera
- **Instant Verification**: Real-time authentication against blockchain records
- **Product Details**: View complete product information including images, serial numbers, and categories
- **Blockchain Explorer Links**: Direct links to view certificates on Solana Explorer

### Technical Features
- **Solana Devnet Integration**: Fast and cost-effective blockchain transactions
- **Wallet Adapter Support**: Compatible with Phantom, Solflare, and other Solana wallets
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Glassmorphism UI**: Modern, premium user interface design
- **Real-time Updates**: Dynamic data fetching from blockchain

## 🔧 How It Works

### Architecture Overview

AuthentiChain uses **Metaplex Protocol** as the core NFT infrastructure on Solana. Metaplex is the industry-standard framework for creating, managing, and querying NFTs on Solana - similar to how ERC-721 is the standard for Ethereum NFTs.

#### Why Metaplex?

- **Standardization**: Creates NFTs compatible with all Solana marketplaces and wallets
- **Abstraction**: Handles complex Solana program interactions automatically
- **Proven**: Powers major Solana NFT projects and marketplaces
- **Feature-Rich**: Built-in support for royalties, metadata standards, and collections

### Metaplex NFT Structure

Each product certificate consists of three blockchain accounts:

1. **🪙 Mint Account** (The NFT's unique identifier)
   - Permanent address used in QR codes
   - Controls token supply (always 1 for NFTs)
   - Immutable once created

2. **📝 Metadata Account** (Product information)
   - Stores name, symbol, and URI
   - Links to IPFS-hosted detailed metadata
   - Contains creator and royalty information

3. **💼 Token Account** (Ownership record)
   - Holds the NFT for the current owner
   - Transferable between wallets
   - Proves authenticity and ownership

### Product Certificate Creation Flow

1. **Brand connects wallet** to the AuthentiChain platform
2. **Upload product details**: Name, category, serial number, description, and image
3. **Image uploaded to Pinata** (IPFS) for decentralized storage
4. **Metadata JSON created** with product attributes and IPFS image link
5. **Metadata uploaded to Pinata** (IPFS) generating a unique URI
6. **Metaplex mints NFT on Solana**:
   - Creates Mint Account (unique product ID)
   - Creates Metadata Account (links to IPFS metadata)
   - Creates Token Account (assigns to brand wallet)
   - Sets update authority to brand wallet
7. **QR code generated** containing the product's mint address
8. **Certificate available** in brand dashboard for download/distribution

### Product Verification Flow

1. **Consumer scans QR code** on product packaging
2. **App extracts mint address** from QR code
3. **Metaplex queries blockchain**:
   - Looks up Mint Account by address
   - Retrieves associated Metadata Account
   - Fetches metadata JSON from IPFS URI
4. **Verification result determined**:
   - ✅ **Genuine**: NFT found with valid metadata
   - ❌ **Suspicious**: Mint address not found or invalid
5. **Product details displayed**: Image, name, serial number, category
6. **Explorer link provided** for blockchain transparency

### Data Flow Diagram

```
Brand Creates Product
    ↓
Product Image → Pinata (IPFS) → Image Hash
    ↓
Metadata JSON → Pinata (IPFS) → Metadata URI
    ↓
Metaplex.create() → Solana Blockchain
    ↓
Mint Address → QR Code → Product Packaging

Consumer Scans QR
    ↓
Mint Address → Metaplex.findByMint()
    ↓
Metadata URI → Fetch from IPFS
    ↓
Display Product Details + Verification Status
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **CSS Modules** - Scoped styling

### Blockchain & Web3
- **Solana Web3.js** - Low-level Solana blockchain interaction
- **Metaplex JS SDK** - NFT creation, management, and querying
  - Industry-standard NFT protocol for Solana
  - Handles Mint, Metadata, and Token account creation
  - Provides high-level APIs for NFT operations
  - Compatible with all Solana NFT marketplaces
- **Solana Wallet Adapter** - Wallet connection (Phantom, Solflare)
  - Multi-wallet support
  - Standardized wallet interface
  - Auto-connect functionality

### Storage
- **Pinata** - IPFS pinning service for images and metadata

### UI Components
- **Lucide React** - Icon library
- **qrcode.react** - QR code generation
- **react-qr-scanner** - QR code scanning

### Development Tools
- **TypeScript** - Type safety
- **ESLint** - Code linting
- **Vite Plugin Node Polyfills** - Node.js compatibility in browser

## 🚀 Setting Up Locally

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Solana wallet** (Phantom or Solflare browser extension)
- **Pinata account** for IPFS storage

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AuthentiChain
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   VITE_PINATA_JWT=your_pinata_jwt_token
   VITE_PINATA_GATEWAY=your_pinata_gateway_url
   ```

   To get Pinata credentials:
   - Sign up at [Pinata.cloud](https://pinata.cloud)
   - Generate an API JWT token from the API Keys section
   - Note your dedicated gateway URL

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 Getting Started

### For Brands

1. **Connect Your Wallet**
   - Click "Connect Wallet" in the navigation
   - Select your Solana wallet (Phantom/Solflare)
   - Approve the connection

2. **Access Brand Dashboard**
   - Navigate to the Brand Dashboard
   - View your existing product certificates

3. **Create Product Certificate**
   - Click "Create Product"
   - Fill in product details:
     - Product Name (required)
     - Category (Electronics, Fashion, Luxury, etc.)
     - Serial Number (required, alphanumeric)
     - Description (optional)
     - Product Image (required, max 5MB)
   - Submit to mint NFT certificate
   - Wait for blockchain confirmation

4. **Download QR Code**
   - View product in dashboard
   - Click "View QR Code"
   - Download QR code image
   - Print and attach to product packaging

### For Consumers

1. **Access Verification Page**
   - Navigate to "Verify Product"

2. **Scan QR Code** (Mobile)
   - Allow camera permissions
   - Point camera at product QR code
   - Automatic redirect to verification result

3. **Manual Verification** (Desktop)
   - Enter the product mint address manually
   - Click "Verify Product"

4. **View Results**
   - See verification status (Genuine/Suspicious)
   - View product details and image
   - Access Solana Explorer link for transparency

## 📱 Mobile Optimization

- Responsive design adapts to all screen sizes
- Icon-only wallet button on mobile
- Fixed-position wallet dropdown prevents overflow
- Touch-optimized QR scanner interface
- Streamlined mobile navigation

## 🔐 Security Features

- **Immutable Records**: Blockchain certificates cannot be altered
- **Decentralized Storage**: IPFS ensures data availability
- **Wallet Authentication**: Only authorized brands can mint certificates
- **Transparent Verification**: All transactions visible on Solana Explorer

## 🌐 Network

Currently deployed on **Solana Devnet** for testing and development.

For production deployment, update the network configuration in `src/components/SolanaProvider.jsx` to use Mainnet-Beta.

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For collaboration inquiries, please contact the project maintainers.

## 📞 Support

For issues or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using Solana blockchain technology**
