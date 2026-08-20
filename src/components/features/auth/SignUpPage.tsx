import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import ContractGapBanner from '../../ui/ContractGapBanner';
import FormErrorBanner from '../../ui/FormErrorBanner';
import Input from '../../ui/Input';
import PasswordInput from '../../ui/PasswordInput';
import { useSignup } from '../../../hooks/useSignup';
import { PATHS } from '../../../routes/paths';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}/;

const SignUpPage = () => {
  const { submit, isLoading, showGapBanner, bannerError, fieldErrors } =
    useSignup();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const clearClientError = (field: string) => {
    if (clientErrors[field]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (!firstName.trim()) errors.first_name = 'First name is required';
    if (!lastName.trim()) errors.last_name = 'Last name is required';
    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailPattern.test(email.trim()))
      errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';
    else if (!passwordPattern.test(password)) {
      errors.password =
        'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
    }
    if (!termsAccepted) {
      errors.terms_accepted =
        'You must accept the Terms of Use and Privacy Policy';
    }

    setClientErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await submit({
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      terms_accepted: termsAccepted,
    });
  };

  return (
    <>
      <div className="text-center">
        <h1 className="font-garamond text-[1.75rem] font-medium leading-tight text-white md:text-[2rem]">
          Great Marketing Made Easier.
          <br />
          Specifically For Agents
        </h1>
        <p className="mt-3 font-almarai text-sm text-color-93">
          Create your account today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
        {bannerError ? <FormErrorBanner message={bannerError} /> : null}
        {showGapBanner ? (
          <ContractGapBanner message="Registration endpoint not available" />
        ) : null}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            name="first_name"
            autoComplete="given-name"
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearClientError('first_name');
            }}
            error={clientErrors.first_name ?? fieldErrors.first_name}
            disabled={isLoading}
          />
          <Input
            name="last_name"
            autoComplete="family-name"
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              clearClientError('last_name');
            }}
            error={clientErrors.last_name ?? fieldErrors.last_name}
            disabled={isLoading}
          />
        </div>

        <Input
          name="email"
          type="email"
          autoComplete="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            clearClientError('email');
          }}
          error={clientErrors.email ?? fieldErrors.email}
          disabled={isLoading}
        />

        <PasswordInput
          name="password"
          autoComplete="new-password"
          label="Create a Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearClientError('password');
          }}
          error={clientErrors.password ?? fieldErrors.password}
          disabled={isLoading}
        />

        <Checkbox
          id="terms-signup"
          checked={termsAccepted}
          onChange={(checked) => {
            setTermsAccepted(checked);
            clearClientError('terms_accepted');
          }}
          error={clientErrors.terms_accepted ?? fieldErrors.terms_accepted}
          label={
            <>
              I have read and agree to the{' '}
              <a href="#" className="underline">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="#" className="underline">
                Privacy Policy
              </a>
              .
            </>
          }
        />

        <Button type="submit" isLoading={isLoading} className="mt-2">
          {isLoading ? 'Signing up…' : 'Sign Up'}
        </Button>
      </form>

      <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-color-57">
        Already have an account?{' '}
        <Link
          to={PATHS.SIGN_IN}
          className="text-white underline-offset-2 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default SignUpPage;
