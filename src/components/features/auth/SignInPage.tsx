import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import FormErrorBanner from '../../ui/FormErrorBanner';
import Input from '../../ui/Input';
import PasswordInput from '../../ui/PasswordInput';
import { getRememberedEmail } from '../../../lib/auth/storage';
import { useLogin } from '../../../hooks/useLogin';
import { PATHS } from '../../../routes/paths';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignInPage = () => {
  const { mutate, isLoading, bannerError, fieldErrors, resetErrors } =
    useLogin();
  const [email, setEmail] = useState(getRememberedEmail() ?? '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(Boolean(getRememberedEmail()));
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const clearClientError = (field: string) => {
    resetErrors();
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

    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailPattern.test(email))
      errors.email = 'Enter a valid email address';
    if (!password) errors.password = 'Password is required';

    setClientErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await mutate(email.trim(), password, rememberMe);
  };

  const emailError = clientErrors.email ?? fieldErrors.email;
  const passwordError = clientErrors.password ?? fieldErrors.password;

  return (
    <>
      <div className="text-center">
        <h1 className="font-garamond text-[2rem] font-medium leading-tight text-white md:text-[2.25rem]">
          Welcome To Agentwise
        </h1>
        <p className="mt-3 font-public text-base text-color-93">
          Everything you need to create standout real estate content.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
        {bannerError ? <FormErrorBanner message={bannerError} /> : null}

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
          error={emailError}
          disabled={isLoading}
        />

        <PasswordInput
          name="password"
          autoComplete="current-password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearClientError('password');
          }}
          error={passwordError}
          disabled={isLoading}
        />

        <div className="flex items-center justify-between pt-1">
          <Checkbox
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={setRememberMe}
            disabled={isLoading}
          />
          <Link
            to={PATHS.FORGOT_PASSWORD}
            className="text-xs text-color-57 underline-offset-2 hover:text-white hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading} className="mt-2">
          {isLoading ? 'Signing in…' : 'Sign In'}
        </Button>
      </form>

      <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-color-57">
        Not a member yet?{' '}
        <Link
          to={PATHS.SIGN_UP}
          className="text-accent underline-offset-2 hover:underline"
        >
          Sign up here.
        </Link>
      </p>
    </>
  );
};

export default SignInPage;
