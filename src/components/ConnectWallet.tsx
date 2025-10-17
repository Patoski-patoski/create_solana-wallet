// components/ConnectWallet.tsx

import { FC, useCallback, useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";

import { Container, Alert, Button } from "react-bootstrap";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { clusterApiUrl } from "@solana/web3.js";
import {
  UnsafeBurnerWalletAdapter,
  SolflareWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// Default wallet adapter styles (Can be overridden)
import "@solana/wallet-adapter-react-ui/styles.css";
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';

const WalletInfo: FC = () => {
  const { publicKey, connected } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(async () => {
    if(publicKey) {
      try {
        await navigator.clipboard.writeText(publicKey.toBase58());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy Address", err);
      }
    }
  }, [publicKey]);

  return (
    <div className="mt-4">
      <h4>Wallet Status</h4>
      {connected ? (
        <Alert variant="success">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <strong>Connected:</strong>{" "}
              <span className="text-break">{ publicKey?.toBase58()}</span>
            </div>
            <Button
              variant="outline-success"
              size="sm"
              onClick={copyAddress}
              className="ms-2"
              >
                {copied ? "Copied": "Copy Address"}
            </Button>
          </div>
        </Alert>
      ): (
        <Alert variant="warning">
          No wallet connected. Please connect a wallet
        </Alert>
      )}
    </div>
  );
}

export const ConnectWallet: FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new UnsafeBurnerWalletAdapter(),
      new SolflareWalletAdapter(),
      new PhantomWalletAdapter()
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Container className="d-flex flex-column align-items-center mt-5">
            <h2 className="mb-4">Connect Your Solana Wallet</h2>
            <div className="d-flex gap-3">
              <WalletMultiButton />
              <WalletDisconnectButton />
            </div>
            <WalletInfo />
          </Container>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}