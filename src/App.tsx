// import { useState } from 'react'
import './App.css'
import CreateWallet from './components/CreateWallet';


const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Solana Wallet Creator</h2>
      <CreateWallet />
    </div>
  );
};


export default App
