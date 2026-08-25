import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', onClick, children }) => {
    const buttonClass = classNames({
        'bg-yellow-500 text-black p-[12px_20px] rounded-[8px]': variant === 'primary',
        'bg-white text-gray-800 p-[12px_20px] rounded-[8px] border border-gray-800': variant === 'secondary'
    });

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    );
};