import { useState, type FormEvent } from 'react';

import SuccessMessage from '@/components/domain/SuccessMessage';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/ErrorAlert';
import FormSkeleton from '@/components/ui/FormSkeleton';
import Input from '@/components/ui/input';
import { requestPasswordReset } from '@/lib/api/client';
import { parseApiError } from '@/lib/api/errors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  form?: string;
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = 'Enter the email address for your account.';
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    return nextErrors;
  }

  async function submitEmail(): Promise<void> {
    const nextErrors = validate();
    setErrors(nextErrors);
    setSuccessMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await requestPasswordReset({ email: email.trim() });
      if (response.success === false) {
        setErrors({ form: response.message });
        return;
      }
      setSuccessMessage(response.message || 'A password reset link has been sent to your email.');
      setErrors({});
    } catch (error: unknown) {
      const parsed = parseApiError(error);
      const emailError = parsed.errors.email?.[0];
      setErrors({
        form: parsed.message,
        email: emailError,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await submitEmail();
  }

  if (successMessage) {
    return <SuccessMessage message={successMessage} />;
  }

  return (
    <form
      className="flex w-full max-w-md flex-col items-center"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      {errors.form && !isSubmitting ? (
        <div className="mb-4 w-full">
          <ErrorAlert message={errors.form} onRetry={() => void submitEmail()} />
        </div>
      ) : null}

      {isSubmitting ? (
        <FormSkeleton label="Sending reset link" />
      ) : (
        <>
          <div className="mb-4 w-full">
            <Input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              label="Email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              required
            />
          </div>
          <Button type="submit" aria-label="Send me a link">
            Send me a link
          </Button>
        </>
      )}
    </form>
  );
}
