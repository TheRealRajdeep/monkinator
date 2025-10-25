import React from 'react';
import { Header, Footer } from '../layout';
import CharacterDisplay from './CharacterDisplay.tsx';
import ActionButtons from './ActionButtons.tsx';

const HeroSection: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col items-center justify-center p-8">
            <Header />

            <CharacterDisplay />

            <ActionButtons />

            <Footer />
        </div>
    );
};

export default HeroSection;