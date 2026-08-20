import { useState, type FormEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login, readApiErrorMessage } from '../../lib/api/auth';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';
import AuthCollage from '../layout/AuthCollage';
import { AuthFormCard, AuthLogo, AuthPane, AuthShell, AuthTagline } from '../layout/AuthLayout';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const rememberKey = 'rememberMe';

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

const PillInput = styled(Input)`
  min-height: 52px;
  padding: ${tokens.spacing['padding-14']} ${tokens.spacing['padding-20']};
  border-radius: ${tokens.radius['radius-10000']};
  border: 1px solid var(--color-63);
  background: var(--color-71);
  color: var(--secondary);

  &::placeholder {
    color: var(--color-93);
  }
`;

const PasswordInput = styled(PillInput)`
  padding-right: ${tokens.spacing['padding-50']};
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

const Submit = styled(Button)`
  width: 100%;
  min-height: 52px;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--accent);
  color: var(--color-16);
  font-family: ${tokens.typography['body-sm-35'].fontFamily}, sans-serif;
  font-size: ${tokens.typography.body.fontSize};
  font-weight: ${tokens.typography['body-sm-35'].fontWeight};
  line-height: ${tokens.typography.body.lineHeight};
`;

const Message = styled.p<{ $tone: 'error' | 'success' }>`
  margin: 0 0 ${tokens.spacing['gap-16']};
  text-align: left;
  color: ${(props) => (props.$tone === 'error' ? 'var(--color-45)' : 'var(--color-17)')};
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

type Status = 'idle' | 'loading' | 'error' | 'success';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => localStorage.getItem(rememberKey) === 'true');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const clearError = () => {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
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
      setMessage('Enter a valid email address.');
      return;
    }
    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }
    if (!password) {
      setStatus('error');
      setMessage('Enter your password.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const result = await login({ email: trimmed, password });
      const token = result.data.token || result.data.accessToken;
      persistToken(token, rememberMe);
      setStatus('success');
      setMessage(result.message);
    } catch (error: unknown) {
      setStatus('error');
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

          {status === 'success' ? (
            <Message $tone="success" role="status">
              {message}
            </Message>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <Field>
                <VisuallyHidden htmlFor="signin-email">Email</VisuallyHidden>
                {status === 'loading' ? (
                  <Skeleton aria-hidden="true" />
                ) : (
                  <PillInput
                    id="signin-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'signin-error' : undefined}
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
                    <PasswordInput
                      id="signin-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Password"
                      value={password}
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
                      {showPassword ? (
                        <FiEyeOff aria-hidden="true" />
                      ) : (
                        <FiEye aria-hidden="true" />
                      )}
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

              {status === 'error' ? (
                <Message $tone="error" id="signin-error" role="alert">
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
          )}

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
