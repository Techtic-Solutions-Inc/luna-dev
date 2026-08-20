import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout, { AuthBrand, AuthForm, AuthHeading, AuthSubheading, AuthFooter } from '../../layout/AuthLayout';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import FormError from '../../ui/FormError';
import { typographyStyle } from '../../../theme/typography';
import { EMAIL_PATTERN, useFormState } from '../../../hooks/useFormState';
import { useEffect, useRef, useState } from 'react';

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

const SuccessPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
  text-align: center;
`;

const SuccessHeading = styled.p`
  ${typographyStyle('body-3')}
  color: var(--secondary);
  margin: 0;
`;

const SuccessDetail = styled.p`
  ${typographyStyle('body-sm-37')}
  color: var(--color-93);
  margin: 0;
`;

const CONTRACT_GAP_MESSAGE =
  'Password reset is unavailable until POST /auth/forgot-password is published in the API contract.';

export default function ForgotPasswordPage() {
  const errorRef = useRef<HTMLDivElement>(null);
  const { setStatus, message, setMessage, fieldError, setFieldError, resetErrors, isLoading, isError, isSuccess } =
    useFormState();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (isError && message && fieldError === null && errorRef.current) {
      errorRef.current.focus();
    }
  }, [isError, message, fieldError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setStatus('error');
      setFieldError('email');
      setMessage('Email is required.');
      return;
    }

    if (!EMAIL_PATTERN.test(trimmedEmail)) {
      setStatus('error');
      setFieldError('email');
      setMessage('Enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setFieldError(null);

    await new Promise((resolve) => setTimeout(resolve, 300));
    setStatus('error');
    setFieldError(null);
    setMessage(CONTRACT_GAP_MESSAGE);
  };

  return (
    <AuthLayout>
      <AuthBrand />
      <HeaderBlock>
        <AuthHeading>Forgot your password?</AuthHeading>
        <AuthSubheading>
          Enter the email address you used to create your account and we&apos;ll send you a link to reset your
          password.
        </AuthSubheading>
      </HeaderBlock>

      {isSuccess ? (
        <SuccessPanel aria-live="polite">
          <SuccessHeading>Check your email</SuccessHeading>
          <SuccessDetail>
            If an account exists for that address, you&apos;ll receive a password reset link shortly.
          </SuccessDetail>
          <AuthFooter>
            Return to <Link to="/sign-in">Sign in</Link>
          </AuthFooter>
        </SuccessPanel>
      ) : (
        <>
          <AuthForm onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
            {isError && fieldError === null && message ? (
              <FormError ref={errorRef} id="forgot-password-error" message={message} />
            ) : null}
            <Input
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              hideLabel
              value={email}
              error={fieldError === 'email' ? message : undefined}
              onChange={(event) => {
                resetErrors();
                setEmail(event.target.value);
              }}
              disabled={isLoading}
            />
            <Button type="submit" fullWidth loading={isLoading} loadingLabel="Sending reset link">
              Send me a link
            </Button>
          </AuthForm>
          <AuthFooter>
            Remember your password? <Link to="/sign-in">Sign in</Link>
          </AuthFooter>
        </>
      )}
    </AuthLayout>
  );
}
