import { useState, type FormEvent } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import styled from 'styled-components';
import { waitForPaint } from '../../lib/waitForPaint';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';
import Button from '../ui/Button';
import Checkbox from '../ui/Checkbox';
import { AuthDarkInput } from '../ui/AuthInput';
import Spinner from '../ui/Spinner';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const verifyErrorId = 'verify-error';

const Page = styled.div`
  min-height: 100vh;
  background: var(--color-16);
  color: var(--secondary);
  padding: ${tokens.spacing['padding-32']} ${tokens.spacing['padding-16']};

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${tokens.spacing['padding-50']} ${tokens.spacing['padding-24']};
  }
`;

const Canvas = styled.article`
  max-width: 640px;
  margin: 0 auto;
`;

const Brand = styled.header`
  text-align: center;
  margin-bottom: ${tokens.spacing['gap-32']};
`;

const Logo = styled.p`
  margin: 0;
  font-family: ${tokens.typography['heading-lg-108'].fontFamily}, cursive;
  font-size: ${tokens.typography['heading-lg-108'].fontSize};
  font-weight: ${tokens.typography['heading-lg-108'].fontWeight};
  line-height: ${tokens.typography['heading-lg-108'].lineHeight};
`;

const Tagline = styled.p`
  margin: ${tokens.spacing['gap-4']} 0 0;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-5'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: ${tokens.spacing['gap-32']};
  padding: ${tokens.spacing['padding-32']} ${tokens.spacing['padding-16']};
  border-radius: ${tokens.radius['radius-16']};
  background: radial-gradient(ellipse at 50% 40%, var(--color-50) 0%, var(--color-16) 72%);
`;

const IconWrap = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto ${tokens.spacing['gap-20']};
  display: grid;
  place-items: center;
  border-radius: ${tokens.radius['radius-10000']};
  background: var(--accent);
  color: var(--secondary);
  font-size: 28px;
`;

const Title = styled.h1`
  margin: 0 0 ${tokens.spacing['gap-16']};
  font-family: ${tokens.typography['heading-xl-44'].fontFamily}, serif;
  font-size: ${tokens.typography['heading-lg-24'].fontSize};
  font-weight: ${tokens.typography['heading-xl-44'].fontWeight};
  line-height: ${tokens.typography['heading-lg-24'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-44'].fontSize};
    line-height: ${tokens.typography['heading-xl-44'].lineHeight};
  }
`;

const Lead = styled.p`
  margin: 0 auto;
  max-width: 36rem;
  color: var(--color-14);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  font-weight: ${tokens.typography['body-sm-38'].fontWeight};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

const Greeting = styled.p`
  margin: 0 0 ${tokens.spacing['gap-12']};
  font-family: ${tokens.typography.body.fontFamily}, sans-serif;
  font-size: ${tokens.typography.body.fontSize};
  line-height: ${tokens.typography.body.lineHeight};
`;

const BodyCopy = styled.p`
  margin: 0 0 ${tokens.spacing['gap-24']};
  color: var(--color-14);
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  line-height: ${tokens.typography['body-3'].lineHeight};
`;

const Field = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-8']};
  margin-bottom: ${tokens.spacing['gap-16']};
`;

const FieldLabel = styled.label`
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  font-weight: ${tokens.typography['caption-5'].fontWeight};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Checks = styled.fieldset`
  border: 0;
  margin: 0 0 ${tokens.spacing['gap-24']};
  padding: 0;
  display: grid;
  gap: ${tokens.spacing['gap-12']};
`;

const Legend = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${tokens.spacing['gap-24']};
`;

const Submit = styled(Button).attrs({ variant: 'gold' as const })`
  width: 100%;
  min-height: 52px;

  @media (min-width: ${breakpoints.tablet}) {
    width: auto;
    min-width: 260px;
  }
`;

const Note = styled.p`
  margin: 0 0 ${tokens.spacing['gap-24']};
  color: var(--color-57);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Alert = styled.aside`
  display: flex;
  gap: ${tokens.spacing['gap-12']};
  padding: ${tokens.spacing['padding-16']};
  border: 1px solid var(--color-49);
  border-radius: ${tokens.radius['radius-8']};
  background: var(--color-33);
  color: var(--color-14);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['body-sm-38'].lineHeight};

  p {
    margin: 0;
  }
`;

const AlertIcon = styled.span`
  color: var(--accent);
  font-size: 18px;
  flex-shrink: 0;
`;

const MailLink = styled.a`
  color: var(--accent);
`;

const ErrorText = styled.p`
  margin: 0 0 ${tokens.spacing['gap-16']};
  color: var(--color-45);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const Footer = styled.footer`
  margin-top: ${tokens.spacing['gap-40']};
  text-align: center;
  color: var(--color-60);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};

  p {
    margin: 0 0 ${tokens.spacing['gap-8']};
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${tokens.spacing['gap-8']} ${tokens.spacing['gap-16']};
  margin-bottom: ${tokens.spacing['gap-16']};
`;

const FooterLink = styled.a`
  color: var(--color-57);
  text-decoration: none;

  &:hover,
  &:focus-visible {
    color: var(--accent);
  }
`;

const Social = styled.div`
  display: flex;
  justify-content: center;
  gap: ${tokens.spacing['gap-16']};
  margin: ${tokens.spacing['gap-16']} 0;
`;

const SocialLink = styled.a`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: ${tokens.radius['radius-10000']};
  border: 1px solid var(--color-49);
  color: var(--accent);
  text-decoration: none;
`;

const SpinnerOnDark = styled.div`
  color: var(--secondary);
`;

type Status = 'idle' | 'loading' | 'error';
type ErrorField = 'email' | 'agreements' | null;

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState<ErrorField>(null);

  const hasError = status === 'error';
  const errorDescribedBy = hasError ? verifyErrorId : undefined;

  const validate = (): { message: string; field: ErrorField } | null => {
    const trimmed = email.trim();
    if (!trimmed) {
      return { message: 'Enter the email address to verify.', field: 'email' };
    }
    if (!emailPattern.test(trimmed)) {
      return { message: 'Enter a valid email address.', field: 'email' };
    }
    if (!privacyAccepted || !termsAccepted) {
      return { message: 'Accept the Privacy Policy and Terms of Service.', field: 'agreements' };
    }
    return null;
  };

  const clearError = () => {
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
      setErrorField(null);
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextError = validate();
    if (nextError) {
      setStatus('error');
      setErrorField(nextError.field);
      setErrorMessage(nextError.message);
      return;
    }
    setStatus('loading');
    setErrorMessage('');
    setErrorField(null);
    await waitForPaint();
    setStatus('error');
    setErrorMessage(
      'Email verification is unavailable until the verify endpoint is published in the API contract.',
    );
  };

  return (
    <Page>
      <Canvas>
        <Brand>
          <Logo>Agentwise</Logo>
          <Tagline>Real Estate Marketing</Tagline>
        </Brand>

        <Hero>
          <IconWrap aria-hidden="true">
            <FiMail />
          </IconWrap>
          <Title>Verify Your Email Address</Title>
          <Lead>
            You&apos;re one step away from accessing your Agentwise workspace. Click the button
            below to confirm your email.
          </Lead>
        </Hero>

        <form onSubmit={(event) => void onSubmit(event)} noValidate>
          <Greeting>Hi,</Greeting>
          <BodyCopy>
            Thanks for registering on the Agentwise portal. To activate your account and get
            started, please verify your email address by clicking the button below.
          </BodyCopy>

          <Field>
            <FieldLabel htmlFor="verify-email">Verify Email Address</FieldLabel>
            <AuthDarkInput
              id="verify-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              aria-invalid={hasError && errorField === 'email'}
              aria-describedby={errorDescribedBy}
              onChange={(event) => {
                setEmail(event.target.value);
                clearError();
              }}
            />
          </Field>

          <Checks>
            <Legend>Agreements</Legend>
            <Checkbox
              id="verify-privacy"
              name="privacy"
              checked={privacyAccepted}
              aria-invalid={hasError && errorField === 'agreements'}
              aria-describedby={errorDescribedBy}
              onChange={(checked) => {
                setPrivacyAccepted(checked);
                clearError();
              }}
            >
              Privacy Policy
            </Checkbox>
            <Checkbox
              id="verify-terms"
              name="terms"
              checked={termsAccepted}
              aria-invalid={hasError && errorField === 'agreements'}
              aria-describedby={errorDescribedBy}
              onChange={(checked) => {
                setTermsAccepted(checked);
                clearError();
              }}
            >
              Terms of Service
            </Checkbox>
          </Checks>

          {hasError ? (
            <ErrorText id={verifyErrorId} role="alert">
              {errorMessage}
            </ErrorText>
          ) : null}

          <Actions>
            <Submit type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? (
                <SpinnerOnDark>
                  <Spinner />
                </SpinnerOnDark>
              ) : (
                'Verify Email Address'
              )}
            </Submit>
          </Actions>
        </form>

        <Note>
          This verification link will expire in 24 hours. If you didn&apos;t create an account on
          Agentwise, you can safely ignore this email.
        </Note>

        <Alert>
          <AlertIcon aria-hidden="true">
            <FiAlertTriangle />
          </AlertIcon>
          <p>
            Never share this link with anyone. Agentwise staff will never ask you to forward this
            email. If you suspect unauthorised access, contact{' '}
            <MailLink href="mailto:hello@agentwisemarketing.com">
              hello@agentwisemarketing.com
            </MailLink>{' '}
            immediately.
          </p>
        </Alert>

        <Footer>
          <FooterNav aria-label="Legal">
            <FooterLink href="https://agentwise.io">Help Center</FooterLink>
            <FooterLink href="https://agentwise.io">Privacy Policy</FooterLink>
            <FooterLink href="https://agentwise.io">Terms of Service</FooterLink>
          </FooterNav>
          <Social>
            <SocialLink href="https://www.facebook.com" aria-label="Facebook">
              <FaFacebookF aria-hidden="true" />
            </SocialLink>
            <SocialLink href="https://www.instagram.com" aria-label="Instagram">
              <FaInstagram aria-hidden="true" />
            </SocialLink>
          </Social>
          <p>© 2026 Agentwise Inc. · All rights reserved.</p>
          <p>You&apos;re receiving this because you registered at agentwise.io</p>
        </Footer>
      </Canvas>
    </Page>
  );
};

export default EmailVerification;
