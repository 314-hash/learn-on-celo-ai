
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Zap, Shield } from 'lucide-react';
import HolographicCard from './HolographicCard';

const ConnectWallet = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      setWalletConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  if (walletConnected) {
    return (
      <HolographicCard className="max-w-md mx-auto">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold hologram-text">Wallet Connected</h3>
          <p className="text-cyan-300">Celo Alfajores Network</p>
          <p className="text-sm text-gray-400 font-mono">0x1234...5678</p>
        </div>
      </HolographicCard>
    );
  }

  return (
    <HolographicCard className="max-w-md mx-auto">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
          <Wallet className="w-10 h-10 text-white" />
        </div>
        
        <div>
          <h3 className="text-2xl font-bold hologram-text mb-2">Connect Your Wallet</h3>
          <p className="text-cyan-300">Access the Celo Alfajores blockchain</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span>Low transaction fees</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Secure & decentralized</span>
          </div>
        </div>

        <Button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl border-2 border-cyan-400 hover:border-purple-400 transition-all duration-300"
        >
          {isConnecting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Connecting...
            </div>
          ) : (
            'Connect Wallet'
          )}
        </Button>
      </div>
    </HolographicCard>
  );
};

export default ConnectWallet;
