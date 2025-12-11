import { Metaplex, walletAdapterIdentity, irysStorage } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useMemo } from "react";

export const useMetaplex = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  const metaplex = useMemo(() => {
    const mx = Metaplex.make(connection)
      .use(irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }));
    
    // Only apply identity if wallet is connected and has public key
    if (wallet && wallet.connected) {
      mx.use(walletAdapterIdentity(wallet));
    }
    
    return mx;
  }, [connection, wallet]);

  return { metaplex };
};
