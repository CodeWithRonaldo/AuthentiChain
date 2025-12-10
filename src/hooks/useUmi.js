import { useMemo } from 'react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

export function useUmi() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const umi = useMemo(() => {
    // Basic devnet connection
    const umiInstance = createUmi(connection.rpcEndpoint)
      .use(mplTokenMetadata());

    if (wallet.publicKey) {
      umiInstance.use(walletAdapterIdentity(wallet));
    }

    return umiInstance;
  }, [connection, wallet]);

  return umi;
}
