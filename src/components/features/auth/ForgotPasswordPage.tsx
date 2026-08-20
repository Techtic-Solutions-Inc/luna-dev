import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import ContractGapBanner from '../../ui/ContractGapBanner';
import FormErrorBanner from '../../ui/FormErrorBanner';
import Input from '../../ui/Input';
import { useForgotPassword } from '../../../hooks/useForgotPassword';
import { PATHS } from '../../../routes/paths';

/** JAW-9188: AppShell dashboard chrome (not AuthLayout) — see routes/layoutConfig.ts */
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordPage = () => {
  const { submit, showGapBanner, bannerError, fieldErrors } =
    useForgotPassword();
  const [email, setEmail] = useState('');
  const [clientError, setClientError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      setClientError('Email is required');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setClientError('Enter a valid email address');
      return;
    }

    setClientError('');
    await submit(email.trim());
  };

  const emailError = clientError || fieldErrors.email;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col justify-center py-8">
      <div className="text-center">
        <h1 className="font-garamond text-2xl font-semibold leading-[31.32px] text-white">
          Reset Password
        </h1>
        <p className="mt-3 font-almarai text-base leading-[17.856px] text-color-93">
          Enter the email address you used to create your account and we&apos;ll
          send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4" noValidate>
        {bannerError ? <FormErrorBanner message={bannerError} /> : null}
        {showGapBanner ? (
          <ContractGapBanner message="Password reset endpoint not available" />
        ) : null}

        <Input
          name="email"
          type="email"
          autoComplete="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (clientError) setClientError('');
          }}
          error={emailError}
          dark
        />

        <Button type="submit" className="mt-2">
          Send me a link
        </Button>
      </form>

      <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-color-57">
        Remember your password?{' '}
        <Link
          to={PATHS.SIGN_IN}
          className="text-accent underline-offset-2 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ForgotPasswordPage;
