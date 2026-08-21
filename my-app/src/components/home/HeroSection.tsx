import styled from 'styled-components';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
} from 'react-icons/fa';
import {
  AccentText,
  BodyText,
  Container,
  MockupImage,
  PrimaryButton,
  Section,
  SerifHeading,
  StatusBanner,
  WideContainer,
} from './shared';
import EmailInput from '../ui/EmailInput';

const HeroSection = styled(Section)`
  position: relative;
  padding-top: ${({ theme }) => theme.spacing['padding-60']};
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -120px;
    right: -120px;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      ${({ theme }) => theme.colors['color-34']}66 0%,
      ${({ theme }) => theme.colors['color-45']}33 40%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: ${({ theme }) => theme.spacing['gap-48']};
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing['gap-40']};
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const HeroTitle = styled(SerifHeading)`
  font-size: clamp(36px, 5vw, 50px);
  line-height: 1.3;
  max-width: 560px;
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
`;

const SocialButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors['color-26']};
  color: ${({ theme }) => theme.colors.secondary};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const MockupWrap = styled.div`
  position: relative;
  filter: drop-shadow(0 34px 44px rgba(0, 0, 0, 0.45));
`;

const NewsletterBand = styled(WideContainer)`
  margin-top: ${({ theme }) => theme.spacing['gap-60']};
  padding-top: ${({ theme }) => theme.spacing['padding-40']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-63']};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  text-align: center;
`;

const NewsletterText = styled(BodyText)`
  max-width: 640px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const EmailRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  width: min(100%, 520px);
  align-items: flex-end;
`;

const socialLinks = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com', color: '#1877f2' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com', color: '#dd2a7b' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com', color: '#ffffff' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0072ce' },
  { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com', color: '#1da1f2' },
];

interface HeroProps {
  newsletterEmail: string;
  newsletterError: string;
  newsletterStatus: 'idle' | 'loading' | 'success' | 'error';
  newsletterMessage: string;
  onNewsletterEmailChange: (value: string) => void;
  onNewsletterSubmit: () => void;
}

const Hero = ({
  newsletterEmail,
  newsletterError,
  newsletterStatus,
  newsletterMessage,
  onNewsletterEmailChange,
  onNewsletterSubmit,
}: HeroProps) => (
  <HeroSection aria-labelledby="hero-heading">
    <Container>
      <HeroGrid>
        <HeroContent>
          <HeroTitle id="hero-heading">
            Stunning Real Estate Marketing, Personalized To Your Market{' '}
            <AccentText>In Minutes</AccentText>
          </HeroTitle>
          <BodyText>
            Agentwise is the all-in-one platform built for modern real estate professionals.
            Create scroll-stopping marketing content personalized to your business and market in
            minutes—not hours.
          </BodyText>
          <SocialRow aria-label="Social media links">
            {socialLinks.map(({ icon: Icon, label, href, color }) => (
              <SocialButton
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ color }}
              >
                <Icon aria-hidden="true" size={14} />
              </SocialButton>
            ))}
          </SocialRow>
        </HeroContent>
        <MockupWrap>
          <MockupImage
            src="/assets/figma/hero-dashboard-mockup.png"
            alt="Agentwise dashboard preview showing content library and AI credit usage"
          />
        </MockupWrap>
      </HeroGrid>
    </Container>
    <NewsletterBand>
      <NewsletterText>
        Join 1,000+ other agents on the newsletter: <strong>Agentwise</strong>
      </NewsletterText>
      <EmailRow>
        <EmailInput
          label="Email"
          placeholder="Enter your email address"
          value={newsletterEmail}
          onChange={(event) => onNewsletterEmailChange(event.target.value)}
          error={newsletterError}
        />
        <PrimaryButton
          type="button"
          onClick={onNewsletterSubmit}
          disabled={newsletterStatus === 'loading'}
          aria-label="Subscribe to newsletter"
        >
          {newsletterStatus === 'loading' ? 'Submitting...' : 'Get Started'}
        </PrimaryButton>
      </EmailRow>
      {newsletterStatus === 'success' || newsletterStatus === 'error' ? (
        <StatusBanner $variant={newsletterStatus === 'success' ? 'success' : 'error'} role="status">
          {newsletterMessage}
        </StatusBanner>
      ) : null}
    </NewsletterBand>
  </HeroSection>
);

export default Hero;
