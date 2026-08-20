import { cn } from '@/lib/utils/cn';

interface FormInputProps {
  id: string;
  label: string;
  name: string;
  type?: 'text' | 'email' | 'tel';
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  isLoading?: boolean;
  autoComplete?: string;
  placeholder?: string;
}

export function FormInput({
  id,
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  isLoading = false,
  autoComplete,
  placeholder,
}: FormInputProps) {
  const errorId = error !== undefined ? `${id}-error` : undefined;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="h-14 w-80 animate-pulse rounded-4 bg-color-41" aria-hidden="true" />
        <div className="h-44 w-full animate-pulse rounded-8 bg-color-41" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <label htmlFor={id} className="type-caption-58 text-white/70">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        onBlur={onBlur}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error !== undefined}
        aria-describedby={errorId}
        className={cn(
          'type-body-sm-2 h-44 w-full rounded-8 border bg-color-23 px-16 text-white placeholder:text-white/30 transition-colors duration-200',
          error !== undefined
            ? 'border-color-45 focus:border-color-45'
            : 'border-color-41 focus:border-accent',
        )}
      />
      {error !== undefined ? (
        <p id={errorId} role="alert" className="type-caption-58 text-color-45">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default FormInput;
