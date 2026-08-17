import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from './Spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  loadingText?: string;
}

export default function Button({
  children,
  loading = false,
  loadingText = 'Please wait…',
  disabled,
  className = '',
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      disabled={disabled || loading}
      aria-busy={loading}
      className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#927a60] text-base text-white transition hover:bg-[#a98d6e] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading && <Spinner size="sm" label={loadingText} />}
      {loading ? loadingText : children}
    </button>
  );
}
