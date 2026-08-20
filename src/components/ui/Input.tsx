interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  dark?: boolean;
}

const Input = ({
  label,
  error,
  dark = false,
  id,
  className = '',
  ...props
}: InputProps) => {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        placeholder={label}
        className={`w-full rounded-[6px] border px-4 py-3 text-sm focus:outline-none focus-visible:outline-none ${
          dark
            ? 'border-white/10 bg-white/5 text-white placeholder:text-color-57 focus-visible:border-accent'
            : 'border-color-24 bg-secondary text-color-20 placeholder:text-color-57 focus-visible:border-color-37'
        } ${error ? 'border-color-45 focus-visible:border-color-45' : ''} ${className}`}
        {...props}
      />
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

export default Input;
