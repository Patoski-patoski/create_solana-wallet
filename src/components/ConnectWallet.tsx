import React, { FC, useMemo } from "react";
import { Container } from "react-bootstrap";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

// Default wallet adapter styles (Can be overridden)
import "@solana/wallet-adapter-react-ui/styles.css";
import '../App.css'

export const ConnectWallet: FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

   return (
     <ConnectionProvider endpoint={endpoint}>
       <WalletProvider wallets={wallets} autoConnect>
         <WalletModalProvider>
           <Container className="d-flex flex-column align-items-center mt-5">
             <h2 className="mb-4 text-light">Connect Your Solana Wallet</h2>
             <WalletMultiButton className="mb-3 fw-bold" />
             <WalletDisconnectButton className="fw-bold" />
           </Container>
         </WalletModalProvider>
       </WalletProvider>
     </ConnectionProvider>
   );
};
