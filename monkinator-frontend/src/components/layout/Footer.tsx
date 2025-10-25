import React from 'react';

interface FooterProps {
    message?: string;
    className?: string;
}

const Footer: React.FC<FooterProps> = ({
    message = "Made with ❤️ for the Monkinator community",
    className = ""
}) => {
    return (
        <div className={`text-center text-purple-500 ${className}`}>
            <p className="text-sm">
                {message}
            </p>
        </div>
    );
};

export default Footer;