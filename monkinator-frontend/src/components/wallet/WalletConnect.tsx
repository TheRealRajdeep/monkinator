import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface WalletConnectProps {
    className?: string;
    showBalance?: boolean | { smallScreen: boolean; largeScreen: boolean };
    accountStatus?: 'avatar' | 'address' | 'full' | { smallScreen: 'avatar' | 'address' | 'full'; largeScreen: 'avatar' | 'address' | 'full' };
    chainStatus?: 'icon' | 'name' | 'full' | 'none' | { smallScreen: 'icon' | 'name' | 'full' | 'none'; largeScreen: 'icon' | 'name' | 'full' | 'none' };
}

const WalletConnect: React.FC<WalletConnectProps> = ({
    className = "",
    showBalance = true,
    accountStatus = "full",
    chainStatus = "full"
}) => {
    return (
        <div className={`wallet-connect-container ${className}`}>
            <ConnectButton
                label="Connect Wallet"
                showBalance={showBalance}
                accountStatus={accountStatus}
                chainStatus={chainStatus}
            />
        </div>
    );
};

export default WalletConnect;