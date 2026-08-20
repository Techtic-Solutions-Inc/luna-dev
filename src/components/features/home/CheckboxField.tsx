import type { ReactNode } from 'react';

interface CheckboxFieldProps {
  id: string;
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
}

const CheckboxField = ({
  id,
  label,
  checked,
  onChange,
  error,
  disabled = false,
}: CheckboxFieldProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-start gap-3">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-[var(--color-41)] bg-[var(--color-36)] accent-[var(--accent)] focus:ring-accent focus:ring-offset-0 disabled:cursor-not-allowed"
      />
      <label
        htmlFor={id}
        className="cursor-pointer font-almarai text-sm leading-relaxed text-[var(--color-57)]"
      >
        {label}
      </label>
    </div>
    {error && (
      <p id={`${id}-error`} className="pl-7 font-almarai text-xs text-[var(--border)]" role="alert">
        {error}
      </p>
    )}
  </div>
);

export default CheckboxField;
