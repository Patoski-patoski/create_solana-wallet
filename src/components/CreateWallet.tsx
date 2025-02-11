import { Button, Alert } from "react-bootstrap";
import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";



const CreateWallet: React.FC = () => {
    const [wallet, setWallet] = useState<{ publicKey: string; secretKey: string } | null>(null);

    const createWallet = () => {
        const newKeyPair = Keypair.generate(); // Ggenerate new wallet
        const publicKey = newKeyPair.publicKey.toBase58(); // Get public Address
        const secretKey = Buffer.from(newKeyPair.secretKey).toString('hex'); //convert secret key

        setWallet({ publicKey, secretKey });

        sessionStorage.setItem("solan wallet", JSON.stringify({ publicKey, secretKey }));

        console.log("New wallet Created: ", {publicKey, secretKey});        
    }


     return (
       <div className="text-center">
         <Button variant="primary" onClick={createWallet}>
           Create New Wallet
         </Button>

         {wallet && (
           <div className="mt-3">
             <Alert variant="success">
               <strong>Public Key:</strong> {wallet.publicKey} <br />
               <strong>Secret Key:</strong> (Keep this safe!) <br />
               <textarea
                 value={wallet.secretKey}
                 readOnly
                 className="form-control"
               />
             </Alert>
           </div>
         )}
       </div>
     );
}


export default CreateWallet;