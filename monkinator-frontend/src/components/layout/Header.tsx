import React from 'react';
import WalletConnect from '../wallet/WalletConnect';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    className?: string;
    showWallet?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    title = "Monkinator",
    subtitle = "Welcome to the magical world of Monkinator! Meet our festive Santa Mon.",
    className = "",
    showWallet = true
}) => {
    return (
        <div className={`text-center mb-8 ${className}`}>
            {/* Wallet Connection - Top Right */}
            {showWallet && (
                <div className="absolute top-4 right-4 z-10">
                    <WalletConnect
                        showBalance={true}
                        accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
                        chainStatus={{ smallScreen: 'icon', largeScreen: 'full' }}
                    />
                </div>
            )}

            <h1 className="text-6xl font-bold text-purple-800 mb-4">
                {title}
            </h1>
            <p className="text-xl text-purple-600 max-w-2xl mx-auto">
                {subtitle}
            </p>
        </div>
    );
};

export default Header;