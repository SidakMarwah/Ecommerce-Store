import React from 'react';

type TruncatedTextProps = {
    lines?: 1 | 2 | 3 | 4; // Restrict lines to 1, 2, 3, or 4
    className?: string;
    children: React.ReactNode;
};

const TruncatedText = ({ lines = 3, className = '', children }: TruncatedTextProps) => {
    return (
        <p className={`truncate-lines-${lines} ${className}`}>
            {children}
        </p>
    );
};

export default TruncatedText;
