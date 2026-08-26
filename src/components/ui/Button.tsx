import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
  const baseClasses = 'p-[12px_20px] rounded-[8px]';
  const variantClasses = variant === 'primary' ? 'bg-[#ffdd55] text-[#000000]' : 'bg-[#ffffff] text-[#333333] border border-[#333333]';

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;