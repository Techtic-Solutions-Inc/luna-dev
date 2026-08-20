import { type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface SharedFieldProps {
  id: string;
  label: string;
  error?: string;
  className?: string;
  hideLabel?: boolean;
  loading?: boolean;
}

type InputProps = SharedFieldProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'className'> & {
    multiline?: false;
  };

type TextAreaProps = SharedFieldProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'className'> & {
    multiline: true;
  };

export type FieldProps = InputProps | TextAreaProps;

const controlClassName = (error: string | undefined) =>
  `w-full rounded-lg border bg-[var(--color-36)] px-4 py-3 font-almarai text-sm text-secondary placeholder:text-[var(--color-57)] transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${
    error ? 'border-[var(--border)]' : 'border-[var(--color-41)]'
  }`;

function FieldSkeleton({ id, label, hideLabel }: { id: string; label: string; hideLabel: boolean }) {
  return (
    <div className="flex flex-col gap-2" aria-busy="true">
      {hideLabel ? (
        <span className="sr-only">{label}</span>
      ) : (
        <span className="h-4 w-24 animate-pulse rounded bg-[var(--color-41)]" />
      )}
      <div
        id={id}
        className="h-12 w-full animate-pulse rounded-lg bg-[var(--color-41)]"
        aria-hidden="true"
      />
      <span className="sr-only">Loading {label}</span>
    </div>
  );
}

export default function Input(props: FieldProps) {
  const { id, label, error, className = '', hideLabel = false, loading = false } = props;

  if (loading) {
    return <FieldSkeleton id={id} label={label} hideLabel={hideLabel} />;
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className={
          hideLabel ? 'sr-only' : 'font-almarai text-sm text-[var(--color-57)]'
        }
      >
        {label}
      </label>
      {props.multiline ? (
        <textarea
          id={id}
          rows={props.rows ?? 4}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${controlClassName(error)} resize-none`}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          name={props.name}
          required={props.required}
        />
      ) : (
        <input
          id={id}
          type={props.type ?? 'text'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={controlClassName(error)}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          name={props.name}
          required={props.required}
          autoComplete={props.autoComplete}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="font-almarai text-xs text-[var(--border)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
