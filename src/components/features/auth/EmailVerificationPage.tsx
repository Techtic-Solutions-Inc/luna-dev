import styled from 'styled-components';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import AuthLayout, { AuthBrand } from '../../layout/AuthLayout';
import Button from '../../ui/Button';
import FormError from '../../ui/FormError';
import { typographyStyle } from '../../../theme/typography';
import { useFormState } from '../../../hooks/useFormState';
import { useEffect, useRef } from 'react';

const Heading = styled.h1`
  ${typographyStyle('heading-lg-57')}
  color: var(--secondary);
  text-align: center;
  margin: 0;
`;

const Subtext = styled.p`
  ${typographyStyle('body-55')}
  color: var(--color-93);
  text-align: center;
  margin: 0;
`;

const BodyText = styled.p`
  ${typographyStyle('body-55')}
  color: var(--color-93);
  text-align: center;
  margin: 0;
`;

const Greeting = styled.p`
  ${typographyStyle('body-55')}
  color: var(--accent);
  text-align: left;
  margin: 0;
`;

const LeftAlignedBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

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

const CtaRow = styled.div`
  display: flex;
  justify-content: center;
  margin-top: var(--padding-16);
`;

const ExpiryText = styled.p`
  ${typographyStyle('caption-4')}
  color: var(--color-93);
  text-align: center;
  margin: 0;
`;

const WarningBox = styled.div`
  width: 100%;
  margin-top: var(--padding-20);
  padding: var(--padding-16);
  border: 1px solid var(--color-44);
  border-radius: var(--radius-8);
  background: var(--color-16);
  color: var(--accent);
  display: flex;
  gap: var(--padding-12);
  align-items: flex-start;
`;

const WarningText = styled.p`
  ${typographyStyle('caption-4')}
  margin: 0;
  color: var(--accent);
  line-height: 1.6;
`;

const WarningLink = styled.a`
  color: var(--accent);
  text-decoration: underline;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

const FooterDivider = styled.div`
  height: 1px;
  width: 100%;
  background: var(--color-44);
  margin: var(--padding-20) 0 var(--padding-16);
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: var(--padding-10);
  align-items: center;
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

const FooterSep = styled.span`
  color: var(--color-57);
`;

const Copyright = styled.p`
  ${typographyStyle('caption-8')}
  color: var(--color-57);
  margin: 0;
  text-align: center;
`;

const Attribution = styled.p`
  ${typographyStyle('caption-8')}
  color: var(--color-57);
  margin: 0;
  text-align: center;
`;

const CONTRACT_GAP_MESSAGE = 'Email verification is unavailable until POST /email/verify is published in the API contract.';

export default function EmailVerificationPage() {
  const errorRef = useRef<HTMLDivElement>(null);
  const { setStatus, message, setMessage, setFieldError, isLoading, isError, isSuccess } = useFormState();

  useEffect(() => {
    if (isError && message && errorRef.current) {
      // focus moves to the banner for keyboard/screen-reader users
      errorRef.current.focus();
    }
  }, [isError, message]);

  const handleVerify = async () => {
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
        <FiMail />
      </IconCircle>
      <Heading>Verify Your Email Address</Heading>
      <Subtext>
        You&apos;re one step away from accessing your Agentwise workspace. Click the button below to confirm your email.
      </Subtext>

      {isSuccess ? (
        <BodyText>
          Your email has been verified successfully. You can now sign in to your Agentwise workspace.
        </BodyText>
      ) : (
        <>
            <LeftAlignedBlock>
            <Greeting>Hi {'{{first_name}}'},</Greeting>
            <BodyText>
              Thanks for registering on the Agentwise portal. To activate your account and get started, please verify your email
              address by clicking the button below.
            </BodyText>
          </LeftAlignedBlock>

          <CtaRow>
            <Button type="button" loading={isLoading} loadingLabel="Verifying email" onClick={handleVerify}>
              Verify Email Address
            </Button>
          </CtaRow>

          <ExpiryText>
            This verification link will expire in 24 hours. If you didn&apos;t create an account on Agentwise, you can safely ignore this email.
          </ExpiryText>

          {isError && message ? <FormError ref={errorRef} id="email-verify-error" message={message} /> : null}

          <WarningBox role="note" aria-label="Security notice">
            <div aria-hidden="true">
              <FiAlertTriangle />
            </div>
            <WarningText>
              Never share this link with anyone. Agentwise staff will never ask you to forward this email. If you suspect
              unauthorised access, contact{' '}
              <WarningLink href="#" aria-disabled="true" tabIndex={-1}>
                hello@agentwisemarketing.com
              </WarningLink>{' '}
              immediately.
            </WarningText>
          </WarningBox>
        </>
      )}

      <FooterDivider aria-hidden="true" />
      <FooterNav aria-label="Legal links">
        <a href="#" aria-disabled="true" tabIndex={-1}>
          Help Center
        </a>
        <FooterSep aria-hidden="true">|</FooterSep>
        <a href="#" aria-disabled="true" tabIndex={-1}>
          Privacy Policy
        </a>
        <FooterSep aria-hidden="true">|</FooterSep>
        <a href="#" aria-disabled="true" tabIndex={-1}>
          Terms of Service
        </a>
      </FooterNav>
      <Copyright>© 2026 Agentwise Inc. · All rights reserved.</Copyright>
      <Attribution>You&apos;re receiving this because you registered at agentwise.io</Attribution>
    </AuthLayout>
  );
}
