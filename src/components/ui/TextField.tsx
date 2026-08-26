import type { InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hintId?: string;
  hideLabel?: boolean;
}

export function TextField({
  label,
  error,
  id,
  hintId,
  hideLabel = false,
  className = '',
  ...props
}: TextFieldProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

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
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={[
          'h-[52px] w-full rounded-control border border-ink bg-panel px-3',
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
      {error && (
        <p id={errorId} role="alert" className="text-[14px] text-[#ea4335]">
          {error}
        </p>
      )}
    </div>
  );
}
