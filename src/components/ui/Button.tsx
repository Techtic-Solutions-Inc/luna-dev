import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-color-16 hover:bg-[#b8936a] active:bg-[#a8835c] disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-23',
  secondary:
    'bg-color-37 text-secondary hover:bg-color-48 active:bg-color-19 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-23',
  ghost:
    'bg-transparent text-secondary border border-secondary hover:bg-color-20 active:bg-color-20 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-23',
  outline:
    'bg-transparent text-accent border border-accent hover:bg-color-40 active:bg-color-28 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-23',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-padding-16 py-padding-8 text-body-sm-106 rounded-radius-10000',
  md: 'px-padding-24 py-padding-12 text-body-34 rounded-radius-10000',
  lg: 'px-padding-40 py-padding-16 text-body-34 rounded-radius-10000',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={[
      'inline-flex items-center justify-center font-almarai font-normal transition-colors duration-200 cursor-pointer',
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? 'w-full' : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {children}
  </button>
);

export default Button;
