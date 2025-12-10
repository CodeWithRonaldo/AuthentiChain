"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Wallet, LogOut } from "lucide-react";
import styles from "./WalletConnectButton.module.css";
// useSolana is the standard useWallet hook we re-exported
import { useSolana } from "../SolanaProvider";

function truncateAddress(address) {
  if (!address) return "";
  const str = address.toBase58 ? address.toBase58() : address.toString();
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
}

function WalletIcon({ wallet, className }) {
  // Standard wallet adapter object has { adapter: { name, icon } }
  const name = wallet?.adapter?.name || wallet?.name || "Wallet";
  const icon = wallet?.adapter?.icon || wallet?.icon;

  return (
    <div className={`${styles.avatar} ${className}`}>
      {icon ? (
        <img src={icon} alt={name} className={styles.avatarImg} />
      ) : (
        <span>{name.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}

// Sub-component for individual wallet option
function WalletOption({ wallet, onSelect }) {
  const handleSelect = () => {
    onSelect(wallet.adapter.name);
  };

  return (
    <button className={styles.walletItem} onClick={handleSelect}>
      <div className={styles.walletItemLeft}>
        <WalletIcon wallet={wallet} className={styles.walletItemIcon} />
        <span className={styles.walletName}>{wallet.adapter.name}</span>
      </div>
    </button>
  );
}

// Sub-component for disconnect
function DisconnectArea({ wallet, publicKey, onDisconnect }) {
  return (
    <>
      <div className={styles.label}>Connected Wallet</div>
      <div className={styles.connectedSection}>
        <WalletIcon wallet={wallet} className={styles.connectedSectionIcon} />
        <div>
          <div className={styles.connectedName}>{wallet?.adapter?.name}</div>
          <div className={styles.connectedAddressSm}>
            {truncateAddress(publicKey)}
          </div>
        </div>
      </div>

      <button className={styles.disconnectBtn} onClick={onDisconnect}>
        <LogOut className={styles.disconnectIcon} />
        Disconnect
      </button>
    </>
  );
}

export default function WalletConnectButton() {
  const {
    wallets,
    select,
    disconnect,
    connected,
    publicKey,
    wallet: selectedWallet,
  } = useSolana();

  const [open, setOpen] = useState(false);

  // Filter installed wallets for cleaner UI (optional, but standard adapter returns many)
  // We can just show all of them.
  const availableWallets = useMemo(() => {
    return wallets.filter((w) => w.readyState === "Installed" || w.readyState === "Loadable");
  }, [wallets]);

  const handleWalletSelect = (walletName) => {
    select(walletName);
    // Auto-connect is usually handled by provider, but we can close modal
    setOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.triggerButton} onClick={() => setOpen(!open)}>
        {connected && publicKey ? (
          <>
            <div className={styles.connectedInfo}>
              <WalletIcon
                wallet={selectedWallet}
                className={styles.connectedIcon}
              />
              <span className={styles.addressText}>
                {truncateAddress(publicKey)}
              </span>
            </div>
            <ChevronDown className={styles.chevron} />
          </>
        ) : (
          <>
            <Wallet className={styles.walletIcon} />
            <span>Connect Wallet</span>
            <ChevronDown className={styles.chevron} />
          </>
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          {availableWallets.length === 0 && !connected ? (
            <p className={styles.noWallets}>No wallets detected</p>
          ) : !connected ? (
            <>
              <div className={styles.label}>Available Wallets</div>
              {availableWallets.map((wallet) => (
                <WalletOption
                  key={wallet.adapter.name}
                  wallet={wallet}
                  onSelect={handleWalletSelect}
                />
              ))}
            </>
          ) : (
            <DisconnectArea
              wallet={selectedWallet}
              publicKey={publicKey}
              onDisconnect={handleDisconnect}
            />
          )}
        </div>
      )}
    </div>
  );
}
