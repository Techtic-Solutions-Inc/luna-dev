import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { AccentText, BodyCopy, Container, GoldButton, HeroDisplay, Section } from './shared';

const HeroSectionWrap = styled(Section)`
  padding-top: ${tokens.spacing['padding-32']};
  background:
    radial-gradient(
      ellipse at 80% 20%,
      color-mix(in srgb, var(--accent) 12%, transparent) 0%,
      transparent 55%
    ),
    radial-gradient(
      ellipse at 20% 0%,
      color-mix(in srgb, var(--color-68) 18%, transparent) 0%,
      transparent 45%
    ),
    var(--color-16);
`;

const Grid = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-32']};
  align-items: center;

  @media (min-width: ${breakpoints.desktop}) {
    grid-template-columns: 1fr 1.1fr;
    gap: ${tokens.spacing['gap-48']};
  }
`;

const CopyBlock = styled.div`
  display: grid;
  gap: ${tokens.spacing['gap-24']};
`;

const HeroTitle = styled(HeroDisplay)`
  font-size: ${tokens.typography['heading-xl-44'].fontSize};
  line-height: ${tokens.typography['heading-xl-44'].lineHeight};

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${tokens.typography['heading-xl-53'].fontSize};
    line-height: ${tokens.typography['heading-xl-53'].lineHeight};
  }

  @media (min-width: ${breakpoints.desktop}) {
    font-size: ${tokens.typography['heading-xl-89'].fontSize};
    line-height: ${tokens.typography['heading-xl-89'].lineHeight};
  }
`;

const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing['gap-12']};
`;

const SocialLink = styled.a`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${tokens.radius['radius-10000']};
  border: 1px solid var(--color-49);
  color: var(--accent);
  text-decoration: none;
`;

const PreviewWrap = styled.div`
  position: relative;
  padding: ${tokens.spacing['padding-16']};
  border-radius: ${tokens.radius['radius-16']};
  border: 1px solid var(--color-49);
  background: linear-gradient(145deg, var(--color-33) 0%, var(--color-20) 100%);
  box-shadow: 0 24px 60px color-mix(in srgb, var(--color-16) 45%, transparent);
`;

const DashboardImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: ${tokens.radius['radius-12']};
  border: 1px solid var(--color-49);
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing['gap-12']};
  align-items: center;
`;

const StyledGoldLink = styled(GoldButton)`
  text-decoration: none;
`;

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com', icon: FaFacebookF },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: FaInstagram },
  { label: 'TikTok', href: 'https://www.tiktok.com', icon: FaTiktok },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: FaLinkedinIn },
  { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
];

const HeroSection = () => (
  <HeroSectionWrap id="about">
    <Container>
      <Grid>
        <CopyBlock>
          <HeroTitle>
            <AccentText>Stunning Real Estate Marketing,</AccentText> Personalized To Your Market In
            Minutes.
          </HeroTitle>
          <BodyCopy>
            Help real estate professionals create content faster with ready-made templates. Increase
            audience engagement through visually appealing social media posts. Download your
            finished content and share it anywhere.
          </BodyCopy>
          <SocialRow aria-label="Social platforms">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <SocialLink key={label} href={href} aria-label={label}>
                <Icon aria-hidden="true" />
              </SocialLink>
            ))}
          </SocialRow>
          <CtaRow>
            <StyledGoldLink as={Link} to="/sign-up">
              Get Started
            </StyledGoldLink>
            <BodyCopy>Join 10,000+ other agents on Agentwise</BodyCopy>
          </CtaRow>
        </CopyBlock>

        <PreviewWrap>
          <DashboardImage
            src="/images/home-dashboard-preview.png"
            alt="Agentwise dashboard preview showing Good morning, Ava. and content templates"
          />
        </PreviewWrap>
      </Grid>
    </Container>
  </HeroSectionWrap>
);

export default HeroSection;
