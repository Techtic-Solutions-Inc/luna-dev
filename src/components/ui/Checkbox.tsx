import type { InputHTMLAttributes, ReactNode } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
}

export function Checkbox({ label, id, className = '', ...props }: CheckboxProps) {
  const inputId = id ?? (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : 'checkbox');

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex cursor-pointer items-start gap-[10px]',
        'text-[14px] font-normal leading-[15.624px] text-ink',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        id={inputId}
        type="checkbox"
        className="mt-[2px] h-4 w-4 shrink-0 accent-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
