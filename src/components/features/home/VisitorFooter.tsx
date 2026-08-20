import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import { breakpoints } from '../../../theme/breakpoints';
import { tokens } from '../../../theme/tokens';
import { Container } from './shared';

const FooterBar = styled.footer`
  padding: ${tokens.spacing['padding-50']} 0 ${tokens.spacing['padding-24']};
  background: var(--color-33);
  border-top: 1px solid var(--color-49);
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing['gap-24']};
  margin-bottom: ${tokens.spacing['gap-32']};

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  margin: 0;
  color: var(--secondary);
  font-family: ${tokens.typography['heading-lg-108'].fontFamily}, cursive;
  font-size: ${tokens.typography['heading-lg-108'].fontSize};
  font-weight: ${tokens.typography['heading-lg-108'].fontWeight};
  line-height: ${tokens.typography['heading-lg-108'].lineHeight};
`;

const Social = styled.div`
  display: flex;
  gap: ${tokens.spacing['gap-12']};
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

const Divider = styled.hr`
  margin: 0 0 ${tokens.spacing['gap-24']};
  border: 0;
  border-top: 1px solid var(--color-49);
`;

const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing['gap-16']};

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing['gap-16']} ${tokens.spacing['gap-24']};
`;

const NavLink = styled.a`
  color: var(--color-57);
  text-decoration: none;
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};

  &:hover,
  &:focus-visible {
    color: var(--accent);
  }
`;

const Meta = styled.p`
  margin: 0;
  color: var(--color-60);
  font-family: ${tokens.typography['caption-4'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['caption-4'].fontSize};
  line-height: ${tokens.typography['caption-4'].lineHeight};
`;

const LegalRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing['gap-16']};
  margin-top: ${tokens.spacing['gap-16']};
`;

const VisitorFooter = () => (
  <FooterBar>
    <Container>
      <TopRow>
        <Logo>Agentwise</Logo>
        <Social aria-label="Social media">
          <SocialLink href="https://www.facebook.com" aria-label="Facebook">
            <FaFacebookF aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://www.instagram.com" aria-label="Instagram">
            <FaInstagram aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://www.tiktok.com" aria-label="TikTok">
            <FaTiktok aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com" aria-label="LinkedIn">
            <FaLinkedinIn aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://twitter.com" aria-label="Twitter">
            <FaTwitter aria-hidden="true" />
          </SocialLink>
        </Social>
      </TopRow>
      <Divider />
      <BottomRow>
        <Nav aria-label="Footer">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#content">Content</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <NavLink href="#blog">Blog</NavLink>
          <NavLink href="#contact">Contact Us</NavLink>
        </Nav>
        <Meta>
          <a href="mailto:hello@agentwisemarketing.com">hello@agentwisemarketing.com</a>
        </Meta>
      </BottomRow>
      <LegalRow>
        <Meta>© 2026 Agentwise Inc. · All rights reserved.</Meta>
        <Nav aria-label="Legal">
          <NavLink href="https://agentwise.io">Terms of Service</NavLink>
          <NavLink href="https://agentwise.io">Privacy Policy</NavLink>
        </Nav>
      </LegalRow>
    </Container>
  </FooterBar>
);

export default VisitorFooter;
