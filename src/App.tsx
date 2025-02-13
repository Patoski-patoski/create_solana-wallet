// App.tsx
import './App.css'
import CreateWallet from './components/CreateWallet';
import { ConnectWallet } from "./components/ConnectWallet.tsx";

const App: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Solana Wallet Creator</h2>
      <CreateWallet />
      <ConnectWallet />
    </div>
  );
};

export default App;
