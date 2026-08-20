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
  dark = false,
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
          className={`w-full rounded-[6px] border px-4 py-3 pr-12 text-sm focus:[outline:none] focus-visible:[outline:none] ${
            dark
              ? 'border-white/10 bg-white/5 text-white placeholder:text-color-57 focus:border-accent focus-visible:border-accent'
              : 'border-color-24 bg-secondary text-color-20 placeholder:text-color-57 focus:border-color-37 focus-visible:border-color-37'
          } ${error ? 'border-color-45 focus:border-color-45 focus-visible:border-color-45' : ''} ${className}`}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          className={`absolute right-4 top-1/2 -translate-y-1/2 text-color-57 focus:outline-none focus-visible:ring-2 focus-visible:ring-color-37 ${
            dark ? 'hover:text-white' : 'hover:text-color-20'
          }`}
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
