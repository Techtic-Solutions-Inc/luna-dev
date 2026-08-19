import { useState, type FormEvent } from 'react';

import SuccessMessage from '@/components/domain/SuccessMessage';
import Button from '@/components/ui/button';
import Checkbox from '@/components/ui/checkbox';
import ErrorAlert from '@/components/ui/ErrorAlert';
import FormSkeleton from '@/components/ui/FormSkeleton';
import Input from '@/components/ui/input';
import TextLink from '@/components/ui/link';
import PasswordToggle from '@/components/ui/PasswordToggle';
import { signUp } from '@/lib/api/client';
import { parseApiError } from '@/lib/api/errors';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  terms_accepted?: string;
  form?: string;
}

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};

    if (!firstName.trim()) {
      nextErrors.first_name = 'Enter your first name.';
    }
    if (!lastName.trim()) {
      nextErrors.last_name = 'Enter your last name.';
    }
    if (!email.trim()) {
      nextErrors.email = 'Enter your email address.';
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!password) {
      nextErrors.password = 'Create a password.';
    }
    if (!termsAccepted) {
      nextErrors.terms_accepted = 'Agree to the Terms of Use and Privacy Policy to continue.';
    }

    return nextErrors;
  }

  async function submitForm(): Promise<void> {
    const nextErrors = validate();
    setErrors(nextErrors);
    setSuccessMessage(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signUp({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
        terms_accepted: true,
      });
      if (response.success === false) {
        setErrors({ form: response.message });
        return;
      }
      setSuccessMessage(response.message || 'Your account has been created.');
      setErrors({});
    } catch (error: unknown) {
      const parsed = parseApiError(error);
      setErrors({
        form: parsed.message,
        first_name: parsed.errors.first_name?.[0],
        last_name: parsed.errors.last_name?.[0],
        email: parsed.errors.email?.[0],
        password: parsed.errors.password?.[0],
        terms_accepted: parsed.errors.terms_accepted?.[0],
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    await submitForm();
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
          <ErrorAlert message={errors.form} onRetry={() => void submitForm()} />
        </div>
      ) : null}

      {isSubmitting ? (
        <FormSkeleton label="Creating your account" lines={5} shape="soft" />
      ) : (
        <>
          <div className="mb-4 grid w-full grid-cols-1 gap-4 tablet:grid-cols-2">
            <Input
              name="first_name"
              autoComplete="given-name"
              label="First Name"
              placeholder="First Name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              error={errors.first_name}
              shape="soft"
              containerClassName="w-full"
              required
            />
            <Input
              name="last_name"
              autoComplete="family-name"
              label="Last Name"
              placeholder="Last Name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              error={errors.last_name}
              shape="soft"
              containerClassName="w-full"
              required
            />
          </div>
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
              shape="soft"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <Input
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              autoComplete="new-password"
              label="Create a Password"
              placeholder="Create a Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={errors.password}
              shape="soft"
              suffix={
                <PasswordToggle
                  visible={passwordVisible}
                  onToggle={() => setPasswordVisible((current) => !current)}
                />
              }
              required
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
                  I have read and agree to the{' '}
                  <TextLink
                    to="/terms-of-use"
                    className="text-color-18"
                    onClick={(event) => event.stopPropagation()}
                  >
                    Terms of Use
                  </TextLink>{' '}
                  and{' '}
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
          <Button type="submit" aria-label="Sign Up">
            Sign Up
          </Button>
          <div className="mt-8 w-full border-t border-color-41 pt-6 text-center">
            <p className="font-almarai text-sm text-color-18">
              Already have an account?{' '}
              <TextLink to="/sign-in" className="text-color-18">
                Sign in
              </TextLink>
            </p>
          </div>
        </>
      )}
    </form>
  );
}
