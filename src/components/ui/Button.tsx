import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-secondary hover:bg-color-65 active:bg-color-32 disabled:opacity-50 disabled:cursor-not-allowed',
  outline:
    'bg-transparent text-secondary border border-secondary hover:border-accent hover:text-accent active:bg-color-20 disabled:opacity-50 disabled:cursor-not-allowed',
  ghost:
    'bg-transparent text-secondary hover:text-accent hover:bg-color-20 active:bg-color-20 disabled:opacity-50 disabled:cursor-not-allowed',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'px-padding-16 py-padding-8 font-almarai text-body-sm-106 rounded-radius-10000',
  md: 'px-padding-24 py-padding-12 font-almarai text-body-77 rounded-radius-10000',
  lg: 'px-padding-32 py-padding-16 font-almarai text-body-34 rounded-radius-10000',
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-24',
        variantClass[variant],
        sizeClass[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
