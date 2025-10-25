import React from 'react';
import { HeroSection } from '../components';

const HomePage: React.FC = () => {
    const handleStartAdventure = () => {
        console.log('Starting adventure...');
        // Add navigation logic here
    };

    const handleLearnMore = () => {
        console.log('Learning more...');
        // Add navigation logic here
    };

    return (
        <HeroSection />
    );
};

export default HomePage;