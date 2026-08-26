import { useState } from 'react';
import type { InputHTMLAttributes } from 'react';

interface PasswordFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  hideLabel?: boolean;
}

function EyeIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M2.5 10s2.5-5 7.5-5 7.5 5 7.5 5-2.5 5-7.5 5-7.5-5-7.5-5z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M2.5 10s2.5-5 7.5-5c1.6 0 3 .4 4.2 1M17.5 10s-2.5 5-7.5 5c-1.6 0-3-.4-4.2-1M3 3l14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function PasswordField({
  label,
  error,
  id,
  hideLabel = false,
  className = '',
  ...props
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className="flex w-full flex-col gap-[10px]">
      <label
        htmlFor={inputId}
        className={
          hideLabel
            ? 'sr-only'
            : 'text-[16px] font-normal leading-[17.856px] text-ink'
        }
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className={[
            'h-[52px] w-full rounded-control border border-ink bg-panel px-3 pr-14',
            'text-[16px] font-normal leading-[17.856px] text-ink',
            'placeholder:text-muted',
            'transition-colors hover:border-accent/60',
            'focus-visible:border-accent focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-[#ea4335]' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-ink/80 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:opacity-80"
        >
          <EyeIcon open={visible} />
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-[14px] text-[#ea4335]">
          {error}
        </p>
      )}
    </div>
  );
}
