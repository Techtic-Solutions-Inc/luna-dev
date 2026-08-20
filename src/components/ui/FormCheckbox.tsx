import type { ReactNode } from 'react';

import { cn } from '@/lib/utils/cn';

interface FormCheckboxProps {
  id: string;
  label: ReactNode;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  isLoading?: boolean;
}

export function FormCheckbox({
  id,
  label,
  name,
  checked,
  onChange,
  error,
  isLoading = false,
}: FormCheckboxProps) {
  const errorId = error !== undefined ? `${id}-error` : undefined;

  if (isLoading) {
    return (
      <div className="flex items-start gap-12">
        <div
          className="mt-2 h-18 w-18 shrink-0 animate-pulse rounded-4 bg-color-41"
          aria-hidden="true"
        />
        <div className="h-14 w-[200px] animate-pulse rounded-4 bg-color-41" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-12">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            onChange(event.target.checked);
          }}
          aria-invalid={error !== undefined}
          aria-describedby={errorId}
          className={cn(
            'mt-2 h-18 w-18 shrink-0 cursor-pointer appearance-none rounded-4 border bg-color-23 transition-colors duration-200',
            'checked:border-accent checked:bg-accent',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-color-16',
            error !== undefined ? 'border-color-45' : 'border-color-41',
          )}
          style={
            checked
              ? {
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230b0b0b'%3E%3Cpath d='M12.207 4.793a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L6.5 9.086l4.293-4.293a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E")`,
                  backgroundSize: '14px',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }
              : undefined
          }
        />
        <label htmlFor={id} className="type-caption-58 cursor-pointer text-white/70">
          {label}
        </label>
      </div>
      {error !== undefined ? (
        <p id={errorId} role="alert" className="type-caption-58 text-color-45">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default FormCheckbox;
