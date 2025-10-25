import React from 'react';
import { useAccount } from 'wagmi';
import { Button } from '../ui';
import WalletConnect from '../wallet/WalletConnect';

interface ActionButtonsProps {
    onStartAdventure?: () => void;
    className?: string;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onStartAdventure,
    className = ""
}) => {
    const { isConnected } = useAccount();

    const handleStartAdventure = () => {
        if (!isConnected) {
            // Show wallet connection modal
            return;
        }
        onStartAdventure?.();
    };

    return (
        <div className={`flex flex-col items-center gap-4 mb-8 ${className}`}>
            {/* Wallet Connection Button */}
            <div className="mb-4">
                <WalletConnect
                    showBalance={true}
                    accountStatus="full"
                    chainStatus="full"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
                <Button
                    variant="default"
                    size="lg"
                    onClick={handleStartAdventure}
                    disabled={!isConnected}
                >
                    {isConnected ? 'Start Adventure' : 'Connect Wallet to Start'}
                </Button>
            </div>
        </div>
    );
};

export default ActionButtons;