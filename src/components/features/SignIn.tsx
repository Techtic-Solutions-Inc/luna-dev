import { useState, type FormEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login, readApiErrorMessage } from '../../lib/api/auth';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';
import AuthCollage from '../layout/AuthCollage';
import { AuthFormCard, AuthLogo, AuthPane, AuthShell, AuthTagline } from '../layout/AuthLayout';
import AuthInput, { AuthPasswordInput } from '../ui/AuthInput';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Spinner from '../ui/Spinner';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rememberKey = 'rememberMe';
const signinErrorId = 'signin-error';

const Title = styled.h1`
  margin: ${tokens.spacing['gap-40']} 0 ${tokens.spacing['gap-12']};
  color: var(--secondary);
  font-family: ${tokens.typography['heading-xl-44'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-31'].fontSize};
  font-weight: ${tokens.typography['heading-xl-44'].fontWeight};
  line-height: ${tokens.typography['heading-lg-31'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-44'].fontSize};
    line-height: ${tokens.typography['heading-xl-44'].lineHeight};
  }
`;

const Subtitle = styled.p`
  margin: 0 0 ${tokens.spacing['gap-32']};
  color: var(--color-14);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  font-weight: ${tokens.typography['body-sm-38'].fontWeight};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

const Field = styled.div`
  position: relative;
  margin-bottom: ${tokens.spacing['gap-16']};
`;

const VisuallyHidden = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Toggle = styled.button`
  position: absolute;
  top: 50%;
  right: ${tokens.spacing['padding-16']};
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-57);
  cursor: pointer;
`;

const Skeleton = styled.div`
  min-height: 52px;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--color-22);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.spacing['gap-12']};
  margin: 0 0 ${tokens.spacing['gap-24']};
  color: var(--color-93);
`;

const ForgotLink = styled(Link)`
  color: var(--color-93);
  text-decoration: none;
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};

  &:hover,
  &:focus-visible {
    color: var(--accent);
  }
`;

const Submit = styled(Button).attrs({ variant: 'pill' as const })`
  width: 100%;
  color: var(--color-16);
`;

const Message = styled.p`
  margin: 0 0 ${tokens.spacing['gap-16']};
  text-align: left;
  color: var(--color-45);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-4'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Divider = styled.hr`
  border: 0;
  height: 1px;
  margin: ${tokens.spacing['gap-24']} 0;
  background: var(--color-49);
`;

const Footer = styled.p`
  margin: 0;
  color: var(--color-93);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const TextLink = styled(Link)`
  color: var(--accent);
  text-underline-offset: 2px;
`;

const SpinnerDark = styled.div`
  color: var(--color-16);
`;

const persistToken = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem('token', token);
    sessionStorage.removeItem('token');
  } else {
    sessionStorage.setItem('token', token);
    localStorage.removeItem('token');
  }
};

type Status = 'idle' | 'loading' | 'error';
type ErrorField = 'email' | 'password' | null;

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => localStorage.getItem(rememberKey) === 'true');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const [errorField, setErrorField] = useState<ErrorField>(null);

  const hasError = status === 'error';
  const errorDescribedBy = hasError ? signinErrorId : undefined;

  const clearError = () => {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
      setErrorField(null);
    }
  };

  const onRemember = (checked: boolean) => {
    setRememberMe(checked);
    localStorage.setItem(rememberKey, checked ? 'true' : 'false');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus('error');
      setErrorField('email');
      setMessage('Enter a valid email address.');
      return;
    }
    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      setErrorField('email');
      setMessage('Enter a valid email address.');
      return;
    }
    if (!password) {
      setStatus('error');
      setErrorField('password');
      setMessage('Enter your password.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setErrorField(null);

    try {
      const result = await login({ email: trimmed, password });
      const token = result.data.token || result.data.accessToken;
      persistToken(token, rememberMe);
      navigate('/dashboard', { replace: true });
    } catch (error: unknown) {
      setStatus('error');
      setErrorField(null);
      setMessage(readApiErrorMessage(error));
    }
  };

  return (
    <AuthShell>
      <AuthPane>
        <AuthFormCard>
          <AuthLogo>Agentwise</AuthLogo>
          <AuthTagline>Real Estate Marketing</AuthTagline>
          <Title>Welcome To Agentwise</Title>
          <Subtitle>Everything you need to create standout real estate content.</Subtitle>

          <form onSubmit={(event) => void onSubmit(event)} noValidate>
            <Field>
              <VisuallyHidden htmlFor="signin-email">Email</VisuallyHidden>
              {status === 'loading' ? (
                <Skeleton aria-hidden="true" />
              ) : (
                <AuthInput
                  id="signin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  value={email}
                  aria-invalid={hasError && errorField === 'email'}
                  aria-describedby={errorDescribedBy}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearError();
                  }}
                />
              )}
            </Field>

            <Field>
              <VisuallyHidden htmlFor="signin-password">Password</VisuallyHidden>
              {status === 'loading' ? (
                <Skeleton aria-hidden="true" />
              ) : (
                <>
                  <AuthPasswordInput
                    id="signin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={password}
                    aria-invalid={hasError && errorField === 'password'}
                    aria-describedby={errorDescribedBy}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      clearError();
                    }}
                  />
                  <Toggle
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword((open) => !open)}
                  >
                    {showPassword ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
                  </Toggle>
                </>
              )}
            </Field>

            <Row>
              <Checkbox
                id="remember-me"
                name="remember_me"
                checked={rememberMe}
                onChange={onRemember}
              >
                Remember me
              </Checkbox>
              <ForgotLink to="/forgot-password">Forgot your password?</ForgotLink>
            </Row>

            {hasError ? (
              <Message id={signinErrorId} role="alert">
                {message}
              </Message>
            ) : null}

            <Submit type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <SpinnerDark>
                  <Spinner />
                </SpinnerDark>
              ) : (
                'Sign In'
              )}
            </Submit>
          </form>

          <Divider />
          <Footer>
            Not a member yet? <TextLink to="/sign-up">Sign up here.</TextLink>
          </Footer>
        </AuthFormCard>
      </AuthPane>
      <AuthCollage />
    </AuthShell>
  );
};

export default SignIn;
