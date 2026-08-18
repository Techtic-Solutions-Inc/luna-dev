import type { InputHTMLAttributes, ReactNode } from 'react'

interface EmailInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  error?: string
}

export function EmailInput({ error, id = 'email', ...props }: EmailInputProps) {
  const errorId = `${id}-error`

  return (
    <div>
      <label className="sr-only" htmlFor={id}>
        Email
      </label>
      <input
        {...props}
        id={id}
        type="email"
        inputMode="email"
        autoComplete="email"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`h-[52px] w-full rounded-full border bg-white/[0.045] px-5 text-sm text-white outline-none transition placeholder:text-[#a09ca0] focus:border-[#c8a47e] focus:ring-2 focus:ring-[#c8a47e]/20 ${
          error ? 'border-[#d9857e]' : 'border-white/[0.14]'
        }`}
      />
      {error ? (
        <p
          className="mt-2 px-2 text-xs leading-[18px] text-[#f1bbb7]"
          id={errorId}
          role="alert"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

interface SubmitButtonProps {
  children: ReactNode
  disabled?: boolean
}

export function SubmitButton({ children, disabled }: SubmitButtonProps) {
  return (
    <button
      className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#927a60] px-5 text-sm font-normal text-white transition hover:bg-[#a98d6e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e] disabled:cursor-not-allowed disabled:opacity-70"
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function LoadingIndicator({ label = 'Sending…' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5" role="status">
      <span
        className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
        aria-hidden="true"
      />
      {label}
    </span>
  )
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-xl border border-[#d9857e]/40 bg-[#d9857e]/10 px-4 py-3 text-sm leading-6 text-[#f1bbb7]"
      role="alert"
    >
      {children}
    </div>
  )
}
