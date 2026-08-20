import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface PasswordInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {
  label: string;
  error?: string;
  dark?: boolean;
}

const PasswordInput = ({
  label,
  error,
  dark = true,
  id,
  className = '',
  ...props
}: PasswordInputProps) => {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? props.name ?? 'password';

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          placeholder={label}
          type={visible ? 'text' : 'password'}
          className={`w-full rounded-full border px-5 py-3.5 pr-12 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
            dark
              ? 'border-white/10 bg-white/5 text-white placeholder:text-color-57'
              : 'border-color-24 bg-white text-color-20 placeholder:text-color-57'
          } ${error ? 'border-color-45' : ''} ${className}`}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-color-57 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      </div>
      {error ? (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-xs text-color-45"
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
};

export default PasswordInput;
