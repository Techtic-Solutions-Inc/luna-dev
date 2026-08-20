interface InputFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'textarea';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const InputField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  placeholder,
  disabled = false,
  loading = false,
  className = '',
}: InputFieldProps) => {
  if (loading) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <div className="h-4 w-24 animate-pulse rounded bg-[var(--color-41)]" aria-hidden="true" />
        <div className="h-12 animate-pulse rounded-lg bg-[var(--color-41)]" aria-hidden="true" />
      </div>
    );
  }

  const sharedClasses = `w-full rounded-lg border bg-[var(--color-36)] px-4 py-3 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${
    error ? 'border-[var(--border)]' : 'border-[var(--color-41)]'
  }`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="font-almarai text-sm text-[var(--color-57)]">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={4}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${sharedClasses} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={sharedClasses}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="font-almarai text-xs text-[var(--border)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
