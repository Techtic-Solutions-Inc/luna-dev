import { useState, type FormEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';
import AuthCollage from '../layout/AuthCollage';
import { AuthFormCard, AuthLogo, AuthPane, AuthShell, AuthTagline } from '../layout/AuthLayout';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Title = styled.h1`
  margin: ${tokens.spacing['gap-32']} 0 ${tokens.spacing['gap-12']};
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
  margin: 0 0 ${tokens.spacing['gap-24']};
  color: var(--accent);
  font-family: ${tokens.typography['heading-lg-74'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-74'].fontSize};
  font-weight: ${tokens.typography['heading-lg-74'].fontWeight};
  line-height: ${tokens.typography['heading-lg-74'].lineHeight};
`;

const NameRow = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-12']};
  margin-bottom: ${tokens.spacing['gap-16']};

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
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

const Legal = styled.div`
  margin: 0 0 ${tokens.spacing['gap-20']};
  text-align: left;
  color: var(--color-93);

  a {
    color: var(--accent);
    text-underline-offset: 2px;
  }
`;

const Submit = styled(Button)`
  width: 100%;
  min-height: 52px;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--accent);
  color: var(--secondary);
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

const Footer = styled.p`
  margin: ${tokens.spacing['gap-24']} 0 0;
  color: var(--color-93);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const TextLink = styled(Link)`
  color: var(--accent);
  text-underline-offset: 2px;
`;

const SpinnerLight = styled.div`
  color: var(--secondary);
`;

type Status = 'idle' | 'loading' | 'error' | 'success';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const clearError = () => {
    if (status === 'error') {
      setStatus('idle');
      setMessage('');
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!firstName.trim()) {
      setStatus('error');
      setMessage('Enter your first name.');
      return;
    }
    if (!lastName.trim()) {
      setStatus('error');
      setMessage('Enter your last name.');
      return;
    }
    if (!email.trim()) {
      setStatus('error');
      setMessage('Enter your email address.');
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }
    if (!password) {
      setStatus('error');
      setMessage('Create a password.');
      return;
    }
    if (!termsAccepted) {
      setStatus('error');
      setMessage('Agree to the Terms of Use and Privacy Policy.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setStatus('success');
    setMessage('Your account was created.');
  };

  return (
    <AuthShell>
      <AuthPane>
        <AuthFormCard>
          <AuthLogo>Agentwise</AuthLogo>
          <AuthTagline>Real Estate Marketing</AuthTagline>
          <Title>Great Marketing Made Easier. Specifically For Agents</Title>
          <Subtitle>Create your account today</Subtitle>

          {status === 'success' ? (
            <Message $tone="success" role="status">
              {message}
            </Message>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <NameRow>
                <Field>
                  <VisuallyHidden htmlFor="first-name">First Name</VisuallyHidden>
                  {status === 'loading' ? (
                    <Skeleton aria-hidden="true" />
                  ) : (
                    <PillInput
                      id="first-name"
                      name="first_name"
                      autoComplete="given-name"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                        clearError();
                      }}
                    />
                  )}
                </Field>
                <Field>
                  <VisuallyHidden htmlFor="last-name">Last Name</VisuallyHidden>
                  {status === 'loading' ? (
                    <Skeleton aria-hidden="true" />
                  ) : (
                    <PillInput
                      id="last-name"
                      name="last_name"
                      autoComplete="family-name"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(event) => {
                        setLastName(event.target.value);
                        clearError();
                      }}
                    />
                  )}
                </Field>
              </NameRow>

              <Field>
                <VisuallyHidden htmlFor="signup-email">Email</VisuallyHidden>
                {status === 'loading' ? (
                  <Skeleton aria-hidden="true" />
                ) : (
                  <PillInput
                    id="signup-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    aria-invalid={status === 'error'}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      clearError();
                    }}
                  />
                )}
              </Field>

              <Field>
                <VisuallyHidden htmlFor="signup-password">Create a Password</VisuallyHidden>
                {status === 'loading' ? (
                  <Skeleton aria-hidden="true" />
                ) : (
                  <>
                    <PasswordInput
                      id="signup-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="Create a Password"
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

              <Legal>
                <Checkbox
                  id="terms"
                  name="terms_accepted"
                  checked={termsAccepted}
                  onChange={(checked) => {
                    setTermsAccepted(checked);
                    clearError();
                  }}
                >
                  I have read and agree to the{' '}
                  <a href="https://agentwise.io" target="_blank" rel="noreferrer">
                    Terms of Use
                  </a>{' '}
                  and{' '}
                  <a href="https://agentwise.io" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>
                  .
                </Checkbox>
              </Legal>

              {status === 'error' ? (
                <Message $tone="error" role="alert">
                  {message}
                </Message>
              ) : null}

              <Submit type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <SpinnerLight>
                    <Spinner />
                  </SpinnerLight>
                ) : (
                  'Sign Up'
                )}
              </Submit>
            </form>
          )}

          <Footer>
            Already have an account? <TextLink to="/sign-in">Sign in</TextLink>
          </Footer>
        </AuthFormCard>
      </AuthPane>
      <AuthCollage />
    </AuthShell>
  );
};

export default SignUp;
