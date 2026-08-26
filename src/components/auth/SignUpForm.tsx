import { useMemo, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthBrand } from '@/components/auth/AuthBrand';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { FormError } from '@/components/ui/FormError';
import { Input } from '@/components/ui/Input';
import { PasswordInput } from '@/components/ui/PasswordInput';
import { useSignUp } from '@/hooks/useSignUp';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function firstMessage(errors: Record<string, string[]>, key: string): string | undefined {
  const value = errors[key];
  return value && value.length > 0 ? value[0] : undefined;
}

export function SignUpForm() {
  const { submit, isSubmitting, error, fieldErrors, success } = useSignUp();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  const canSubmit = termsAccepted && !isSubmitting;

  const mergedErrors = useMemo(
    () => ({
      first_name: localErrors.first_name ?? firstMessage(fieldErrors, 'first_name'),
      last_name: localErrors.last_name ?? firstMessage(fieldErrors, 'last_name'),
      email: localErrors.email ?? firstMessage(fieldErrors, 'email'),
      password: localErrors.password ?? firstMessage(fieldErrors, 'password'),
      terms_accepted: localErrors.terms_accepted ?? firstMessage(fieldErrors, 'terms_accepted'),
    }),
    [fieldErrors, localErrors],
  );

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!firstName.trim()) next.first_name = 'First name is required.';
    if (!lastName.trim()) next.last_name = 'Last name is required.';
    if (!email.trim()) next.email = 'Email is required.';
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    if (!termsAccepted) next.terms_accepted = 'You must accept the terms to continue.';
    setLocalErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    await submit({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      terms_accepted: true,
    });
  }

  return (
    <form
      id="auth-form"
      onSubmit={onSubmit}
      className="flex w-full max-w-[461px] flex-col items-center"
      noValidate
    >
      <AuthBrand />
      <h1 className="mt-[30px] max-w-[461px] text-center font-garamond text-[32px] font-medium leading-[41.76px] text-white">
        Great Marketing Made Easier. Specifically For Agents
      </h1>
      <p className="type-body-3 mt-[16px] text-center font-almarai text-[#637381]">
        Create your account today
      </p>

      <div className="mt-[30px] flex w-full flex-col gap-[16px]">
        <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
          <Input
            id="first-name"
            name="first_name"
            label="First Name"
            placeholder="First Name"
            autoComplete="given-name"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            error={mergedErrors.first_name}
            disabled={isSubmitting}
          />
          <Input
            id="last-name"
            name="last_name"
            label="Last Name"
            placeholder="Last Name"
            autoComplete="family-name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            error={mergedErrors.last_name}
            disabled={isSubmitting}
          />
        </div>
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={mergedErrors.email}
          disabled={isSubmitting}
        />
        <PasswordInput
          id="password"
          name="password"
          label="Create a Password"
          placeholder="Create a Password"
          autoComplete="new-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={mergedErrors.password}
          disabled={isSubmitting}
        />
        <Checkbox
          id="terms"
          name="terms_accepted"
          checked={termsAccepted}
          onChange={(event) => setTermsAccepted(event.target.checked)}
          disabled={isSubmitting}
          error={mergedErrors.terms_accepted}
          label={
            <>
              I have read and agree to the{' '}
              <Link to="/terms-of-service" className="underline text-[#c8a47e] hover:text-[#8b6842] focus-visible:text-[#c8a47e]">
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="underline text-[#c8a47e] hover:text-[#8b6842] focus-visible:text-[#c8a47e]">
                Privacy Policy
              </Link>
              .
            </>
          }
        />
        <FormError message={error} />
        {success ? (
          <p className="type-body-15 font-almarai text-[#c8a47e]" role="status">
            Account created. Redirecting to sign in…
          </p>
        ) : null}
        <Button isLoading={isSubmitting} disabled={!canSubmit} shape="box">
          Sign Up
        </Button>
      </div>

      <hr className="mt-[24px] h-px w-full border-0 bg-[#637381]" />
      <p className="type-body-15 mt-[16px] text-center font-almarai text-white">
        Already have an account?{' '}
        <Link to="/signin" className="text-[#c8a47e] underline hover:text-[#8b6842] focus-visible:text-[#c8a47e]">
          Sign in
        </Link>
      </p>
    </form>
  );
}
