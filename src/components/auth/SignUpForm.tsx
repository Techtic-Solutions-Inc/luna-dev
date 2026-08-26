import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@/components/ui/TextField';
import { PasswordField } from '@/components/ui/PasswordField';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { AgentwiseLogo } from '@/components/auth/AgentwiseLogo';
import { useSignup } from '@/hooks/useSignup';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export function SignUpForm() {
  const { submit, loading, error, fieldErrors } = useSignup();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.first_name = 'First name is required';
    if (!lastName.trim()) errors.last_name = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (!PASSWORD_RE.test(password))
      errors.password =
        'Password must be 8+ characters with uppercase, lowercase, number, and special character';
    if (!termsAccepted) errors.terms_accepted = 'You must accept the terms';
    setClientErrors(errors);
    if (Object.keys(errors).length > 0) return;

    void submit({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      terms_accepted: termsAccepted,
    });
  };

  const mergedErrors = { ...clientErrors, ...fieldErrors };

  return (
    <>
      <AgentwiseLogo />
      <form
        onSubmit={handleSubmit}
        aria-busy={loading}
        className="flex w-full flex-col gap-[20px]"
        noValidate
      >
        <header className="flex flex-col items-center gap-4 text-center">
          <h1
            className="max-w-[461px] text-[32px] font-medium leading-[41.76px] text-ink"
            style={{ fontFamily: 'EB Garamond, serif' }}
          >
            Great Marketing Made Easier. Specifically for Agents
          </h1>
          <h2
            className="text-[20px] font-normal leading-[22.32px] text-[#c8a47e]"
            style={{ fontFamily: 'Almarai, sans-serif' }}
          >
            Create your account today
          </h2>
        </header>

        {error && <Alert message={error} />}

        <div className="flex flex-col gap-[20px] md:flex-row md:gap-[20px]">
          <TextField
            label="First Name"
            hideLabel
            name="first_name"
            autoComplete="given-name"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={mergedErrors.first_name}
            disabled={loading}
            className="bg-[#1A1A1A] md:max-w-[220px] md:flex-1"
          />
          <TextField
            label="Last Name"
            hideLabel
            name="last_name"
            autoComplete="family-name"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={mergedErrors.last_name}
            disabled={loading}
            className="bg-[#1A1A1A] md:max-w-[220px] md:flex-1"
          />
        </div>

        <TextField
          label="Email"
          hideLabel
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={mergedErrors.email}
          disabled={loading}
          className="bg-[#1A1A1A]"
        />

        <PasswordField
          label="Create a Password"
          hideLabel
          name="password"
          autoComplete="new-password"
          placeholder="Create a Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={mergedErrors.password}
          disabled={loading}
          className="bg-[#1A1A1A]"
        />

        <Checkbox
          label={
            <>
              I have read and agree to the{' '}
              <a
                href="/#terms-of-service"
                className="text-accent underline hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Terms of Use
              </a>{' '}
              and{' '}
              <a
                href="/#privacy-policy"
                className="text-accent underline hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Privacy Policy
              </a>
              .
            </>
          }
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          disabled={loading}
        />
        {mergedErrors.terms_accepted && (
          <p role="alert" className="text-[14px] leading-[15.624px] text-[#ea4335]">
            {mergedErrors.terms_accepted}
          </p>
        )}

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!termsAccepted}
          className="h-[52px] rounded-[100px] text-[16px] font-semibold leading-6"
        >
          Sign Up
        </Button>

        <hr className="border-0 border-t border-line/60" />

        <p className="text-center text-[16px] leading-6 text-muted">
          Already have an account?{' '}
          <Link
            to="/signin"
            className="text-accent underline hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Sign in
          </Link>
        </p>
      </form>
    </>
  );
}
