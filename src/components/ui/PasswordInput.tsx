import { useState, type InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/Input';

interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: string;
  error?: string;
}

export function PasswordInput({
  id,
  label,
  error,
  disabled,
  className = '',
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      id={id}
      label={label}
      error={error}
      disabled={disabled}
      className={className}
      suffix={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-[16px] top-1/2 -translate-y-1/2 text-muted hover:text-accent focus-visible:text-accent disabled:cursor-not-allowed disabled:opacity-50"
          disabled={disabled}
        >
          <EyeIcon off={visible} />
        </button>
      }
      {...props}
      type={visible ? 'text' : 'password'}
    />
  );
}

function EyeIcon({ off }: { off: boolean }) {
  if (off) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 3l18 18M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-4.4M9.9 5.1A10.8 10.8 0 0112 5c7 0 10 7 10 7a16.6 16.6 0 01-3.2 3.8M6.1 6.1C3.7 7.8 2 12 2 12s3 7 10 7a10.5 10.5 0 004.1-.8"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
