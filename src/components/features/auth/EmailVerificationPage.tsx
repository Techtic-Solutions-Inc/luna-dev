import styled from 'styled-components';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { colors, radius, shadows, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import Button from '../../ui/Button';

/**
 * Static preview of the ✉ Email Verification Figma (transactional email layout).
 * Not a live verify form — POST /api/email/verify is not an executed contract yet.
 * Shell/icon/CTA widths use nearest Sofia spacing tokens (gap624 / gap75 / gap303).
 */
const Page = styled.main`
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: ${spacing.padding40} ${spacing.padding16};
  background: ${colors.color16};
`;

const EmailShell = styled.article`
  width: 100%;
  max-width: ${spacing.gap624};
  margin-top: ${spacing.gap24};
  padding: ${spacing.padding40} ${spacing.padding32};
  background: ${colors.color23};
  border-radius: ${radius.radius16};
  box-shadow: ${shadows.dropShadow11};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap24};
  text-align: center;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap6};
`;

const Logo = styled.p`
  margin: 0;
  color: ${colors.secondary};
  ${typographyStyle('headingLg108')}
`;

const Tagline = styled.p`
  margin: 0;
  ${typographyStyle('caption57')}
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${colors.color93};
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${spacing.gap75};
  height: ${spacing.gap75};
  border-radius: ${radius.radius10000};
  background: ${colors.color26};
  color: ${colors.secondary};
`;

const Heading = styled.h1`
  margin: 0;
  color: ${colors.secondary};
  ${typographyStyle('headingXl44')}
`;

const Lead = styled.p`
  margin: 0;
  max-width: ${spacing.gap465};
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
`;

const Body = styled.div`
  width: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
`;

const Greeting = styled.p`
  margin: 0;
  color: ${colors.secondary};
`;

const Message = styled.p`
  margin: 0;
`;

const CtaWrap = styled.div`
  width: 100%;
  max-width: ${spacing.gap303};
  margin: ${spacing.gap8} auto 0;
  align-self: center;
`;

const Expiry = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color57};
  ${typographyStyle('caption4')}
`;

const Security = styled.aside`
  width: 100%;
  display: flex;
  gap: ${spacing.gap12};
  align-items: flex-start;
  text-align: left;
  padding: ${spacing.padding16};
  border: 1px solid ${colors.color49};
  border-radius: ${radius.radius10};
  color: ${colors.color93};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.accent};
  }
`;

const SecurityIcon = styled.span`
  color: ${colors.accent};
  flex-shrink: 0;
  margin-top: ${spacing.padding2};
`;

const Footer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap8};
  align-items: center;
  color: ${colors.color57};
  ${typographyStyle('caption4')}
`;

const FooterLinks = styled.p`
  margin: 0;

  span + span::before {
    content: ' | ';
    color: ${colors.color49};
  }
`;

export default function EmailVerificationPage() {
  return (
    <Page>
      <EmailShell aria-label="Email verification template preview">
        <Brand>
          <Logo>Agentwise</Logo>
          <Tagline>Real Estate Marketing</Tagline>
        </Brand>
        <IconWrap aria-hidden="true">
          <FiMail size={28} />
        </IconWrap>
        <Heading>Verify Your Email Address</Heading>
        <Lead>
          You&apos;re one step away from accessing your Agentwise workspace. Click the button below
          to confirm your email.
        </Lead>
        <Body>
          <Greeting>Hi {'{{first_name}}'},</Greeting>
          <Message>
            Thanks for registering on the Agentwise portal. To activate your account and get
            started, please verify your email address by clicking the button below.
          </Message>
          <CtaWrap>
            <Button type="button" variant="accent" shape="pill" disabled>
              Verify Email Address
            </Button>
          </CtaWrap>
          <Expiry>
            This verification link will expire in 24 hours. If you didn&apos;t create an account on
            Agentwise, you can safely ignore this email.
          </Expiry>
        </Body>
        <Security>
          <SecurityIcon aria-hidden="true">
            <FiAlertTriangle size={18} />
          </SecurityIcon>
          <p>
            Never share this link with anyone. Agentwise staff will never ask you to forward this
            email. If you suspect unauthorised access, contact{' '}
            <a href="mailto:hello@agentwisemarketing.com">hello@agentwisemarketing.com</a>{' '}
            immediately.
          </p>
        </Security>
        <Footer>
          <FooterLinks>
            <span>Help Center</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </FooterLinks>
          <p>© 2026 Agentwise Inc. · All rights reserved.</p>
          <p>You&apos;re receiving this because you registered at agentwise.io</p>
        </Footer>
      </EmailShell>
    </Page>
  );
}
