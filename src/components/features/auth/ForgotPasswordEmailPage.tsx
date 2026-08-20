import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiLock } from 'react-icons/fi';
import AuthLayout, { AuthBrand, AuthForm, AuthHeading, AuthSubheading, AuthFooter } from '../../layout/AuthLayout';
import Input from '../../ui/Input';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';
import FormError from '../../ui/FormError';
import { typographyStyle } from '../../../theme/typography';
import { EMAIL_PATTERN, useFormState } from '../../../hooks/useFormState';
import { useEffect, useRef, useState } from 'react';

const IconCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 72px;
  margin: 0 auto;
  border-radius: var(--radius-1000);
  background: var(--accent);
  color: var(--secondary);
  font-size: 28px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

const LegalLink = styled.a`
  color: var(--accent);
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

const FooterLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--padding-8);
  ${typographyStyle('caption-4')}
  color: var(--color-93);

  a {
    color: var(--color-93);
    text-decoration: none;

    &:hover,
    &:focus-visible {
      color: var(--accent);
      text-decoration: underline;
    }
  }
`;

const FooterDivider = styled.span`
  color: var(--color-57);
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

export default function ForgotPasswordEmailPage() {
  const errorRef = useRef<HTMLDivElement>(null);
  const { setStatus, message, setMessage, fieldError, setFieldError, resetErrors, isLoading, isError, isSuccess } =
    useFormState();
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

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

    if (!privacyAccepted || !termsAccepted) {
      setStatus('error');
      setFieldError('terms');
      setMessage('Accept the Privacy Policy and Terms of Service.');
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
    <AuthLayout singleColumn narrow showCollage={false}>
      <AuthBrand />
      <IconCircle aria-hidden="true">
        <FiLock />
      </IconCircle>
      <HeaderBlock>
        <AuthHeading>Reset Password</AuthHeading>
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
        </SuccessPanel>
      ) : (
        <AuthForm onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
          {isError && fieldError === null && message ? (
            <FormError ref={errorRef} id="forgot-password-email-error" message={message} />
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
          <CheckboxGroup>
            <Checkbox
              id="privacy-forgot-email"
              checked={privacyAccepted}
              onChange={(checked) => {
                resetErrors();
                setPrivacyAccepted(checked);
              }}
              disabled={isLoading}
              label={
                <>
                  I agree to the{' '}
                  <LegalLink href="#" aria-disabled="true" tabIndex={-1}>
                    Privacy Policy
                  </LegalLink>
                </>
              }
            />
            <Checkbox
              id="terms-forgot-email"
              checked={termsAccepted}
              onChange={(checked) => {
                resetErrors();
                setTermsAccepted(checked);
              }}
              disabled={isLoading}
              label={
                <>
                  I agree to the{' '}
                  <LegalLink href="#" aria-disabled="true" tabIndex={-1}>
                    Terms of Service
                  </LegalLink>
                </>
              }
            />
          </CheckboxGroup>
          {fieldError === 'terms' && message ? <FormError message={message} /> : null}
          <Button type="submit" fullWidth loading={isLoading} loadingLabel="Sending reset link">
            Send me a link
          </Button>
        </AuthForm>
      )}

      <FooterLinks aria-label="Legal and support links">
        <a href="#" aria-disabled="true" tabIndex={-1}>
          Help Center
        </a>
        <FooterDivider aria-hidden="true">|</FooterDivider>
        <a href="#" aria-disabled="true" tabIndex={-1}>
          Privacy Policy
        </a>
        <FooterDivider aria-hidden="true">|</FooterDivider>
        <a href="#" aria-disabled="true" tabIndex={-1}>
          Terms of Service
        </a>
      </FooterLinks>

      <AuthFooter>
        Remember your password? <Link to="/sign-in">Sign in</Link>
      </AuthFooter>
    </AuthLayout>
  );
}
