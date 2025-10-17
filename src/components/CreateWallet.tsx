// components/CreateWallet.tsx
import { Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";

interface WalletData {
  walletAddress: string;
  privateKey: string;
}

const CreateWallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);

  const createWallet = () => {
    try {
      const newKeyPair = Keypair.generate(); // Generate new wallet
      const walletAddress = newKeyPair.publicKey.toBase58();
      const privateKey = Buffer.from(newKeyPair.secretKey).toString("hex");

      setWallet({ walletAddress, privateKey });

      sessionStorage.setItem("solanaWalletPublicAddress", walletAddress);
      console.log("New wallet Created: ", walletAddress);
    } catch (error) {
      console.error("Error creating wallet", error);
    }
  };

  const copyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div className="text-center">
      <Button variant="primary" onClick={createWallet} className="mb-4">
        Create New Wallet
      </Button>

      {wallet && (
        <div className="mt-3">
          <Alert variant="success">
            <div className="mb-3">
              <strong>Wallet Address:</strong>{" "}
              <span className="text-break">{wallet.walletAddress}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2"
                onClick={() => copyToClipBoard(wallet.walletAddress)}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>

            <div>
              <strong>Private Key:</strong>{" "}
              <Button
                variant="warning"
                size="sm"
                className="ms-2"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? "Hide" : "Show"}
              </Button>
              {showSecret && ( // Only renders if showSecret is true
                <div className="mt-2">
                  <Alert variant="warning">
                    Never share your secrete Key! Anyone with this key can
                    access your funds
                  </Alert>
                  <textarea
                    value={wallet.privateKey}
                    readOnly
                    className="form-control"
                    rows={4}
                  />
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="mt-2"
                    onClick={() => copyToClipBoard(wallet.privateKey)}
                  >
                    {copied ? "Copied!" : "Copy Secret Key"}
                  </Button>
                </div>
              )}
            </div>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
