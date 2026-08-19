import { useState, type FormEvent } from 'react';

import SuccessMessage from '@/components/domain/SuccessMessage';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import ErrorAlert from '@/components/ui/ErrorAlert';
import FormSkeleton from '@/components/ui/FormSkeleton';
import Input from '@/components/ui/input';
import TextLink from '@/components/ui/link';
import { verifyEmail } from '@/lib/api/client';
import { parseApiError } from '@/lib/api/errors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  privacy_accepted?: string;
  terms_accepted?: string;
  form?: string;
}

export default function EmailVerificationForm() {
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
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

    if (!privacyAccepted) {
      nextErrors.privacy_accepted = 'Agree to the Privacy Policy to continue.';
    }

    if (!termsAccepted) {
      nextErrors.terms_accepted = 'Agree to the Terms of Service to continue.';
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
      const response = await verifyEmail({ email: email.trim() });
      if (response.success === false) {
        setErrors({ form: response.message });
        return;
      }
      setSuccessMessage(response.message || 'Your email address has been verified.');
      setErrors({});
    } catch (error: unknown) {
      const parsed = parseApiError(error);
      setErrors({
        form: parsed.message,
        email: parsed.errors.email?.[0],
        privacy_accepted: parsed.errors.privacy_accepted?.[0],
        terms_accepted: parsed.errors.terms_accepted?.[0],
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
        <FormSkeleton label="Verifying your email address" lines={4} />
      ) : (
        <>
          <div className="mb-4 w-full">
            <Input
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              label="Verify Email Address"
              placeholder="Verify Email Address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              required
            />
          </div>
          <div className="mb-3 w-full">
            <Checkbox
              id="privacy-accepted"
              name="privacy_accepted"
              checked={privacyAccepted}
              onChange={(event) => setPrivacyAccepted(event.target.checked)}
              error={errors.privacy_accepted}
              label={
                <>
                  I agree to the{' '}
                  <TextLink
                    to="/privacy-policy"
                    className="text-color-18"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Privacy Policy
                  </TextLink>
                  .
                </>
              }
            />
          </div>
          <div className="mb-6 w-full">
            <Checkbox
              id="terms-accepted"
              name="terms_accepted"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
              error={errors.terms_accepted}
              label={
                <>
                  I agree to the{' '}
                  <TextLink
                    to="/terms-of-service"
                    className="text-color-18"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Terms of Service
                  </TextLink>
                  .
                </>
              }
            />
          </div>
          <Button type="submit" className="text-secondary" aria-label="Verify Email Address">
            Verify Email Address
          </Button>
        </>
      )}
    </form>
  );
}
