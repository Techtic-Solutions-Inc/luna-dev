import { useState, type FormEvent } from 'react'
import { useForgotPassword } from '../../hooks/useForgotPassword'
import {
  EmailInput,
  ErrorMessage,
  LoadingIndicator,
  SubmitButton,
} from './FormControls'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string) {
  if (!email.trim()) {
    return 'Enter your email address.'
  }

  if (!emailPattern.test(email.trim())) {
    return 'Enter a valid email address.'
  }

  return ''
}

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')
  const { error, isLoading, requestReset, successMessage } =
    useForgotPassword()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextError = validateEmail(email)
    setValidationError(nextError)

    if (nextError) {
      return
    }

    await requestReset(email.trim())
  }

  if (successMessage) {
    return (
      <div
        className="rounded-2xl border border-[#c8a47e]/20 bg-white/[0.045] px-6 py-5 text-center"
        role="status"
        aria-live="polite"
      >
        <div
          className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#c8a47e] text-[#14100d]"
          aria-hidden="true"
        >
          ✓
        </div>
        <p className="mt-4 text-sm leading-6 text-[#bdbdbd]">
          {successMessage}
        </p>
      </div>
    )
  }

  return (
    <form className="mt-10 space-y-7" onSubmit={handleSubmit} noValidate>
      <EmailInput
        value={email}
        placeholder="Email"
        disabled={isLoading}
        error={validationError}
        onBlur={() => setValidationError(validateEmail(email))}
        onChange={(event) => {
          setEmail(event.target.value)
          if (validationError) {
            setValidationError('')
          }
        }}
        aria-label="Email address"
      />

      {error ? <ErrorMessage>{error}</ErrorMessage> : null}

      <SubmitButton disabled={isLoading}>
        {isLoading ? <LoadingIndicator /> : 'Send me a link'}
      </SubmitButton>
    </form>
  )
}
