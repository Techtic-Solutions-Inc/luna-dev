import styled from 'styled-components';
import { FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Container } from './shared';
import AppLink from '../ui/AppLink';

const FooterBar = styled.footer`
  padding: ${({ theme }) => theme.spacing['padding-60']} 0
    ${({ theme }) => theme.spacing['padding-32']};
  background: ${({ theme }) => theme.colors['color-16']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-63']};
`;

const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-32']};
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 24px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondary};
`;

const SocialRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors['color-63']};
  color: ${({ theme }) => theme.colors.secondary};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const NavRow = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-24']};
`;

const NavLink = styled.a`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors['color-96']};

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const BottomRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  padding-top: ${({ theme }) => theme.spacing['padding-24']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-63']};
`;

const Copyright = styled.p`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors['color-96']};
  margin: 0;
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const EmailLink = styled.a`
  font-size: 14px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.accent};

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact Us', href: '#contact' },
];

const HomeFooter = () => (
  <FooterBar role="contentinfo">
    <Container>
      <TopRow>
        <Logo>Agentwise</Logo>
        <SocialRow aria-label="Social media links">
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter aria-hidden="true" size={14} />
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn aria-hidden="true" size={14} />
          </SocialLink>
          <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram aria-hidden="true" size={14} />
          </SocialLink>
        </SocialRow>
        <EmailLink href="mailto:hello@agentwisemarketing.com">hello@agentwisemarketing.com</EmailLink>
      </TopRow>
      <NavRow aria-label="Footer navigation">
        {navItems.map((item) => (
          <NavLink key={item.label} href={item.href}>
            {item.label}
          </NavLink>
        ))}
      </NavRow>
      <BottomRow>
        <Copyright>&copy; 2024 Agentwise. All Rights Reserved.</Copyright>
        <LegalLinks>
          <AppLink to="#contact" variant="inline">
            Terms of Service
          </AppLink>
          <AppLink to="#contact" variant="inline">
            Privacy Policy
          </AppLink>
        </LegalLinks>
      </BottomRow>
    </Container>
  </FooterBar>
);

export default HomeFooter;
