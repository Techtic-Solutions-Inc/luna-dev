import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';
import AuthCollage from '../layout/AuthCollage';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Spinner from '../ui/Spinner';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  background: var(--color-16);

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: minmax(420px, 1.15fr) minmax(380px, 0.95fr);
  }
`;

const Pane = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing['padding-24']};
  background: radial-gradient(
    ellipse at 50% 42%,
    var(--color-50) 0%,
    var(--color-20) 42%,
    var(--color-16) 78%
  );
`;

const FormCard = styled.div`
  width: min(100%, 420px);
  text-align: center;
`;

const Logo = styled.p`
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-lg-108'].fontFamily}, cursive;
  font-size: ${tokens.typography['heading-lg-108'].fontSize};
  font-weight: ${tokens.typography['heading-lg-108'].fontWeight};
  line-height: ${tokens.typography['heading-lg-108'].lineHeight};
`;

const Tagline = styled.p`
  margin: ${tokens.spacing['gap-4']} 0 0;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--secondary);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-5'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Title = styled.h1`
  margin: ${tokens.spacing['gap-40']} 0 ${tokens.spacing['gap-16']};
  color: var(--secondary);
  font-family: ${tokens.typography['heading-xl-44'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-24'].fontSize};
  font-weight: ${tokens.typography['heading-xl-44'].fontWeight};
  line-height: ${tokens.typography['heading-lg-24'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-44'].fontSize};
    line-height: ${tokens.typography['heading-xl-44'].lineHeight};
  }
`;

const Instructions = styled.p`
  margin: 0 0 ${tokens.spacing['gap-32']};
  color: var(--color-14);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  font-weight: ${tokens.typography['body-sm-38'].fontWeight};
  line-height: ${tokens.typography['body-3'].lineHeight};
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

const Field = styled.div`
  position: relative;
  margin-bottom: ${tokens.spacing['gap-16']};
`;

const PillInput = styled(Input)`
  min-height: 52px;
  padding: ${tokens.spacing['padding-14']} ${tokens.spacing['padding-20']};
  border-radius: ${tokens.radius['radius-10000']};
  border: 1px solid var(--color-63);
  background: var(--color-71);
  color: var(--secondary);

  &::placeholder {
    color: var(--color-57);
  }
`;

const Skeleton = styled.div`
  min-height: 52px;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--color-22);
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

const SpinnerLight = styled.div`
  color: var(--secondary);
`;

type Status = 'idle' | 'loading' | 'error' | 'success';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed) {
      setStatus('error');
      setMessage('Enter the email address you used to create your account.');
      return;
    }

    if (!emailPattern.test(trimmed)) {
      setStatus('error');
      setMessage('Enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setStatus('success');
    setMessage('A reset link has been sent to your email address.');
  };

  return (
    <Shell>
      <Pane>
        <FormCard>
          <Logo>Agentwise</Logo>
          <Tagline>Real Estate Marketing</Tagline>
          <Title>Reset Password</Title>
          <Instructions>
            Enter the email address you used to create your account and we&apos;ll send you a link
            to reset your password.
          </Instructions>

          {status === 'success' ? (
            <Message $tone="success" role="status">
              {message}
            </Message>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              <Field>
                <VisuallyHidden htmlFor="reset-email">Email</VisuallyHidden>
                {status === 'loading' ? (
                  <Skeleton aria-hidden="true" />
                ) : (
                  <PillInput
                    id="reset-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    value={email}
                    aria-invalid={status === 'error'}
                    aria-describedby={status === 'error' ? 'reset-email-error' : undefined}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      if (status === 'error') {
                        setStatus('idle');
                        setMessage('');
                      }
                    }}
                  />
                )}
              </Field>

              {status === 'error' ? (
                <Message $tone="error" id="reset-email-error" role="alert">
                  {message}
                </Message>
              ) : null}

              <Submit type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <SpinnerLight>
                    <Spinner />
                  </SpinnerLight>
                ) : (
                  'Send me a link'
                )}
              </Submit>
            </form>
          )}
        </FormCard>
      </Pane>
      <AuthCollage />
    </Shell>
  );
};

export default ForgotPassword;
