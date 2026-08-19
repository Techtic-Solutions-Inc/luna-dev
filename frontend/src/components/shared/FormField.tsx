import type { ReactNode, SelectHTMLAttributes } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function FormField({
  id,
  label,
  error,
  children,
  className = '',
}: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={id} className="block text-[13px] text-[#A6A4A2]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] text-[#ff5630]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export const inputClassName =
  'focus-ring box-border h-11 w-full rounded-[8px] border border-white/10 bg-[#26231f] px-4 text-[14px] text-white placeholder:text-[#646261] focus-visible:border-primary';

export const selectClassName =
  `${inputClassName} appearance-none pr-12`;

export const textareaClassName =
  'focus-ring box-border min-h-[120px] w-full resize-y rounded-[8px] border border-white/10 bg-[#26231f] px-4 py-3 text-[14px] text-white placeholder:text-[#646261] focus-visible:border-primary';

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
}

export function SelectField({
  id,
  label,
  error,
  options,
  placeholder = 'Select',
  className = '',
  ...selectProps
}: SelectFieldProps) {
  return (
    <FormField id={id} label={label} error={error}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error)}
          className={`${selectClassName} ${className}`}
          {...selectProps}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#A6A4A2]"
        >
          ▾
        </span>
      </div>
    </FormField>
  );
}

export const primaryButtonClassName =
  'focus-ring inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm text-white transition-colors hover:bg-[#b48a5d] disabled:opacity-40';

export const secondaryButtonClassName =
  'focus-ring inline-flex h-11 items-center justify-center rounded-full bg-[#646261] px-5 text-sm text-white transition-colors hover:bg-[#858585] disabled:opacity-40';
