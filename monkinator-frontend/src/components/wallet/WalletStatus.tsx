import React from 'react';
import { useAccount, useBalance, useDisconnect } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletStatus: React.FC = () => {
    const { address, isConnected } = useAccount();
    const { data: balance } = useBalance({
        address: address,
    });
    const { disconnect } = useDisconnect();

    if (!isConnected) {
        return <ConnectButton label="Connect Wallet" />;
    }

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                            {address?.slice(2, 4).toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900">
                            {address?.slice(0, 6)}...{address?.slice(-4)}
                        </p>
                        <p className="text-xs text-gray-500">
                            {balance?.formatted} {balance?.symbol}
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => disconnect()}
                    className="px-3 py-1 text-xs bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                >
                    Disconnect
                </button>
            </div>
        </div>
    );
};

export default WalletStatus;