import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
}

export function TextInput({
  label,
  error,
  hideLabel = false,
  id,
  className = '',
  ...rest
}: TextInputProps) {
  const inputId = id ?? rest.name ?? label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={inputId} className={hideLabel ? 'sr-only' : 'font-almarai text-body-sm-106 text-secondary'}>
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={[
          'w-full rounded-radius-10 border border-color-20 bg-color-16 px-padding-16 py-padding-12',
          'font-almarai text-body-77 text-secondary placeholder:text-text-secondary',
          'hover:border-color-14 focus:border-accent focus:outline-none',
          'focus-visible:ring-2 focus-visible:ring-accent transition-colors',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          error ? 'border-color-51' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {error ? (
        <p id={`${inputId}-error`} role="alert" className="font-almarai text-body-sm-106 text-color-51">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface CheckboxProps {
  name: string;
  label: ReactNode;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function Checkbox({ name, label, checked, onChange, error }: CheckboxProps) {
  const id = name;
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className="flex items-start gap-8 font-almarai text-body-sm-106 text-color-14">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="mt-1 h-4 w-4 accent-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p role="alert" className="font-almarai text-body-sm-106 text-color-51">
          {error}
        </p>
      ) : null}
    </div>
  );
}
