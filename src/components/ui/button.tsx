import type { ButtonHTMLAttributes, ReactNode } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
}

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-color-16',
  secondary: 'bg-transparent text-secondary',
  outline: 'border border-secondary bg-transparent text-secondary',
};

export default function Button({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`inline-flex w-full max-w-md items-center justify-center rounded-full px-6 py-3 font-almarai text-base font-bold outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${variantClassName[variant]} ${className}`}
    >
      {loading ? <LoadingSpinner size={18} label="Loading" className="text-color-16" /> : children}
    </button>
  );
}
