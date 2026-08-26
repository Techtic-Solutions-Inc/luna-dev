import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  label: ReactNode;
  error?: string;
  labelClassName?: string;
  align?: 'start' | 'center';
  afterLabel?: ReactNode;
}

export function Checkbox({
  id,
  label,
  error,
  disabled,
  className = '',
  labelClassName = 'type-body-15 font-almarai text-ink',
  align = 'start',
  afterLabel,
  ...props
}: CheckboxProps) {
  const alignClass = align === 'center' ? 'items-center' : 'items-start';
  return (
    <div className={className}>
      <div className={`flex gap-[10px] ${alignClass}`}>
        <input
          id={id}
          type="checkbox"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-[16px] w-[16px] shrink-0 cursor-pointer rounded-[2px] border border-ink/40 accent-accent hover:border-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 ${
            align === 'start' ? 'mt-[2px]' : ''
          }`}
          {...props}
        />
        <div>
          <label htmlFor={id} className={labelClassName}>
            {label}
          </label>
          {afterLabel}
          {error ? (
            <p id={`${id}-error`} className="type-body-69 mt-[2px] font-almarai text-border" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
