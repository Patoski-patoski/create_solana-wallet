// components/CreateWallet.tsx
import { Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";

interface WalletData {
  publicKey: string;
  secretKey: string;
}

const CreateWallet: React.FC = () => {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState(false);


  const createWallet = () => {
    try {
      const newKeyPair = Keypair.generate(); // Ggenerate new wallet
      const publicKey = newKeyPair.publicKey.toBase58(); // Get public Address
      const secretKey = Buffer.from(newKeyPair.secretKey).toString("hex");
      setWallet({ publicKey, secretKey });

      sessionStorage.setItem("solanaWalletPublicKey", publicKey);
      console.log("New wallet Created: ", publicKey);

    } catch (error) {
      console.error("Error creating wallet", error);
    }
  };

  const copyToClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text", err);
    }
  };

  return (
    <div className="text-center">
      <Button variant="primary" onClick={createWallet} className="mb-3">
        Create New Wallet
      </Button>

      {wallet && (
        <div className="mt-3">
          <Alert variant="success">
            <div className="mb-3">
              <strong>Public Key:</strong> {" "}
              <span className="text-break">{wallet.publicKey}</span>
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-2"
                onClick={() => copyToClipBoard(wallet.publicKey)}
              >
                {copied ? "Copied!": "Copy"}
              </Button>
            </div>
            <div>
              <strong>Secret Key:</strong>{" "}
              <Button
                variant="warning"
                size="sm"
                className="ms-2"
                onClick={() => setShowSecret(!showSecret)}
              >
                {showSecret ? "Hide" : "Show"}

              </Button>
              {showSecret && (
                <div className="mt-2">
                  <Alert variant="warning">
                    Never share your secrete Key! Anyone with this key can access your funds.

                  </Alert>

                </div>
              )}
            </div>
            <textarea
              value={wallet.secretKey}
              readOnly
              aria-setsize={50}
              className="form-control"
            />
          </Alert>
        </div>
      )}
    </div>
  );
}


export default CreateWallet;