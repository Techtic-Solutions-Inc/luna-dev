import styled from 'styled-components';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from 'react-icons/fa';
import {
  AccentText,
  BodyText,
  Container,
  MockupImage,
  PrimaryButton,
  Section,
  SerifHeading,
  WideContainer,
} from './shared';

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
  justify-content: center;
`;

const socialLinks = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com', color: '#1877f2' },
  { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com', color: '#dd2a7b' },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com', color: '#ffffff' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0072ce' },
];

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => (
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
        Join 15,248+ other agents on the newsletter at <strong>Agentwise</strong>
      </NewsletterText>
      <EmailRow>
        <PrimaryButton type="button" onClick={onGetStarted} aria-label="Get started with Agentwise">
          Get Started
        </PrimaryButton>
      </EmailRow>
    </NewsletterBand>
  </HeroSection>
);

export default Hero;
