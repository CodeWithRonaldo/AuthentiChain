# AuthentiChain

**Securing product authenticity through Solana-powered NFT certificates.**

## Overview

AuthentiChain is a decentralized product authentication platform built on the **Solana blockchain**, enabling brands to mint **NFT-based certificates** for physical products and allowing consumers to verify authenticity instantly using QR codes.

By leveraging Solana’s **high-speed, low-cost, and immutable ledger**, AuthentiChain creates tamper-proof digital records that permanently link physical products to verifiable on-chain proof—eliminating counterfeits and restoring consumer trust.

## Core Features

- **NFT Product Certificates** – Each product is minted as a unique NFT on Solana.
- **Instant QR Verification** – Consumers scan a QR code to verify authenticity in real time.
- **On-Chain Immutability** – Certificates cannot be altered or forged once minted.
- **Brand Dashboards** – Manage and track all product certificates from one interface.
- **IPFS Storage** – Product images and metadata stored on Pinata (IPFS).
- **Wallet-Based Authentication** – Secure access using Solana wallets.
- **Explorer Transparency** – Direct links to Solana Explorer for public verification.

## Real Use Case: A Brand’s Anti-Counterfeit Flow

A luxury brand manufactures a new product line and uses AuthentiChain to mint NFT certificates for each product. A QR code is attached to the product packaging.

When a customer scans the QR code:
- The app checks Solana on-chain records
- Verifies the NFT metadata
- Confirms whether the product is genuine or suspicious

## How It Works

### Certificate Creation (Brands)
1. Brand connects a Solana wallet  
2. Uploads product details and image  
3. Image and metadata stored on IPFS via Pinata  
4. NFT minted on Solana using Metaplex  
5. QR code generated from the NFT mint address  

### Product Verification (Consumers)
1. Scan QR code  
2. NFT data fetched from Solana  
3. Metadata retrieved from IPFS  
4. Authenticity status displayed instantly  

## How Solana Powers AuthentiChain

Solana provides:
- Fast transaction confirmation
- Low-cost NFT minting
- Immutable product records
- Public verification via Solana Explorer

AuthentiChain uses **Metaplex**, Solana’s NFT standard, ensuring full compatibility with wallets and marketplaces.

## Tech Stack

| Layer | Technology |
|------|-----------|
| Blockchain | Solana (Devnet) |
| NFT Protocol | Metaplex |
| Frontend | React 18 + Vite |
| Wallets | Phantom, Solflare |
| Storage | Pinata (IPFS) |
| Styling | CSS Modules |
| Language | TypeScript |

## Getting Started

```bash
git clone https://github.com/CodeWithRonaldo/AuthentiChain.git
cd AuthentiChain
npm install
npm run dev
```

Create a `.env.local` file:

```env
VITE_PINATA_JWT=your_pinata_jwt
VITE_PINATA_GATEWAY=your_pinata_gateway
```

## Contributing

Feel free to contribute or join the discussion.

**GitHub Repository:** [GitHub](https://github.com/CodeWithRonaldo/AuthentiChain)

**Live Url:** [AuthentiChain Live](https://authenti-chain.vercel.app/)


## License

This project is licensed under **MIT LICENSE**. See the [LICENSE](LICENSE) file for details.

---

**Built with Love on Solana to restore trust in physical products.**