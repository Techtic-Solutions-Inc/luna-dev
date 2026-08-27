import { useState, type InputHTMLAttributes } from "react";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hideLabel?: boolean;
  shape?: "default" | "pill";
}

export function PasswordInput({
  label,
  error,
  id,
  className = "",
  hideLabel = false,
  shape = "default",
  disabled,
  ...rest
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const inputId = id ?? rest.name ?? "password";
  const errorId = `${inputId}-error`;
  const radius = shape === "pill" ? "rounded-1000" : "rounded-16";
  return (
    <div className="flex w-full flex-col">
      <label
        className={`text-body text-color-131 ${hideLabel ? "sr-only" : "mb-8"}`}
        htmlFor={inputId}
        style={{ fontFamily: "'Almarai', sans-serif" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          {...rest}
          id={inputId}
          type={visible ? "text" : "password"}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          disabled={disabled}
          className={`h-52 w-full ${radius} border border-secondary bg-color-106 px-16 pr-52 text-body text-secondary placeholder:text-color-135 transition hover:border-accent focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          style={{ fontFamily: "'Almarai', sans-serif" }}
        />
        <button
          type="button"
          disabled={disabled}
          className="absolute right-16 top-1/2 -translate-y-1/2 text-secondary transition hover:text-accent focus-visible:text-accent active:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
        >
          <EyeIcon off={visible} />
        </button>
      </div>
      {error ? (
        <span id={errorId} className="mt-8 text-body text-border" style={{ fontFamily: "'Almarai', sans-serif" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      {off ? <path d="M4 4l16 16" stroke="currentColor" strokeWidth="1.5" /> : null}
    </svg>
  );
}
