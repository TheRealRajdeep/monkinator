import React from 'react';
import { Card } from '../ui';

interface CharacterDisplayProps {
    imageSrc?: string;
    altText?: string;
    className?: string;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
    imageSrc = "/santamon.png",
    altText = "Santa Mon - Festive Character",
    className = ""
}) => {
    return (
        <div className={`relative mb-8 ${className}`}>
            <Card>
                <img
                    src={imageSrc}
                    alt={altText}
                    className="w-80 h-auto mx-auto drop-shadow-lg hover:scale-105 transition-transform duration-300"
                />
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-red-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -bottom-4 -left-6 w-7 h-7 bg-green-400 rounded-full animate-bounce delay-200"></div>
            <div className="absolute -bottom-2 -right-4 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-300"></div>
        </div>
    );
};

export default CharacterDisplay;