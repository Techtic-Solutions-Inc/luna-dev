import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthLayout, {
  AuthBrand,
  AuthFooter,
  AuthForm,
  AuthHeading,
  AuthSubheading,
} from '../../layout/AuthLayout';
import Input from '../../ui/Input';
import PasswordInput from '../../ui/PasswordInput';
import Checkbox from '../../ui/Checkbox';
import Button from '../../ui/Button';
import FormError from '../../ui/FormError';
import { typographyStyle } from '../../../theme/typography';
import { breakpoints } from '../../../theme/breakpoints';
import { EMAIL_PATTERN, useFormState } from '../../../hooks/useFormState';
import { useEffect, useRef, useState } from 'react';

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

const TwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--padding-12);

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const LegalLink = styled.a`
  color: var(--accent);
  text-decoration: underline;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const FooterDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-44);
  margin: 0;
  width: 100%;
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
  'Sign up is unavailable until POST /auth/signup is published in the API contract.';

export default function SignUpPage() {
  const errorRef = useRef<HTMLDivElement>(null);
  const { setStatus, message, setMessage, fieldError, setFieldError, resetErrors, isLoading, isError, isSuccess } =
    useFormState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    if (isError && message && fieldError === null && errorRef.current) {
      errorRef.current.focus();
    }
  }, [isError, message, fieldError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim()) {
      setStatus('error');
      setFieldError('firstName');
      setMessage('Enter your first name.');
      return;
    }

    if (!lastName.trim()) {
      setStatus('error');
      setFieldError('lastName');
      setMessage('Enter your last name.');
      return;
    }

    if (!email.trim()) {
      setStatus('error');
      setFieldError('email');
      setMessage('Enter your email address.');
      return;
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      setStatus('error');
      setFieldError('email');
      setMessage('Enter a valid email address.');
      return;
    }

    if (!password) {
      setStatus('error');
      setFieldError('password');
      setMessage('Create a password.');
      return;
    }

    if (!termsAccepted) {
      setStatus('error');
      setFieldError('terms');
      setMessage('Agree to the Terms of Use and Privacy Policy.');
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
        <AuthHeading>Great Marketing Made Easier. Specifically For Agents</AuthHeading>
        <AuthSubheading>Create your account today</AuthSubheading>
      </HeaderBlock>

      {isSuccess ? (
        <SuccessPanel aria-live="polite">
          <SuccessHeading>Account created</SuccessHeading>
          <SuccessDetail>Check your email to verify your account before signing in.</SuccessDetail>
          <AuthFooter>
            Continue to <Link to="/verify-email">Email verification</Link> or{' '}
            <Link to="/sign-in">Sign in</Link>
          </AuthFooter>
        </SuccessPanel>
      ) : (
        <>
          <AuthForm onSubmit={handleSubmit} noValidate aria-busy={isLoading}>
            {isError && fieldError === null && message ? (
              <FormError ref={errorRef} id="sign-up-error" message={message} />
            ) : null}
            <TwoCol>
              <Input
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                placeholder="First Name"
                hideLabel
                value={firstName}
                error={fieldError === 'firstName' ? message : undefined}
                onChange={(event) => {
                  resetErrors();
                  setFirstName(event.target.value);
                }}
                disabled={isLoading}
              />
              <Input
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                placeholder="Last Name"
                hideLabel
                value={lastName}
                error={fieldError === 'lastName' ? message : undefined}
                onChange={(event) => {
                  resetErrors();
                  setLastName(event.target.value);
                }}
                disabled={isLoading}
              />
            </TwoCol>
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
            <PasswordInput
              label="Create a Password"
              name="password"
              autoComplete="new-password"
              placeholder="Create a Password"
              hideLabel
              value={password}
              error={fieldError === 'password' ? message : undefined}
              onChange={(event) => {
                resetErrors();
                setPassword(event.target.value);
              }}
              disabled={isLoading}
            />
            <Checkbox
              id="terms-signup"
              checked={termsAccepted}
              onChange={(checked) => {
                resetErrors();
                setTermsAccepted(checked);
              }}
              disabled={isLoading}
              label={
                <>
                  I have read and agree to the{' '}
                  <LegalLink href="#" aria-disabled="true" tabIndex={-1}>
                    Terms of Use
                  </LegalLink>{' '}
                  and{' '}
                  <LegalLink href="#" aria-disabled="true" tabIndex={-1}>
                    Privacy Policy
                  </LegalLink>
                  .
                </>
              }
            />
            {fieldError === 'terms' && message ? <FormError message={message} /> : null}
            <Button type="submit" fullWidth loading={isLoading} loadingLabel="Creating account">
              Sign Up
            </Button>
          </AuthForm>
          <FooterDivider />
          <AuthFooter>
            Already have an account? <Link to="/login">Sign in</Link>
          </AuthFooter>
        </>
      )}
    </AuthLayout>
  );
}
