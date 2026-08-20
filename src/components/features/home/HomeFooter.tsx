import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { SectionContainer } from './homeStyles';

const Footer = styled.footer`
  padding: ${({ theme }) => `${theme.spacing['padding-40']} 0 ${theme.spacing['padding-24']}`};
  background-color: ${({ theme }) => theme.colors['color-16']};
  border-top: 1px solid ${({ theme }) => theme.colors['color-41']};
`;

const FooterTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-32']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius['radius-10000']};
  border: 1px solid ${({ theme }) => theme.colors['color-49']};
  color: ${({ theme }) => theme.colors.secondary};
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FooterMiddle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-16']};
  margin-bottom: ${({ theme }) => theme.spacing['gap-32']};
  padding-bottom: ${({ theme }) => theme.spacing['padding-32']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-41']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const FooterLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  color: ${({ theme }) => theme.colors['color-61']};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const FooterEmail = styled.a`
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  color: ${({ theme }) => theme.colors.accent};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FooterBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['gap-12']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.typography['caption-4'].fontFamily};
  font-size: ${({ theme }) => theme.typography['caption-4'].fontSize};
  color: ${({ theme }) => theme.colors['color-57']};
`;

const LegalLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['gap-24']};
`;

const HomeFooter = () => (
  <Footer>
    <SectionContainer>
      <FooterTop>
        <Logo to="/" aria-label="Agentwise home">
          Agentwise
        </Logo>
        <SocialRow aria-label="Social media links">
          <SocialLink href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <FaFacebookF size={14} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://x.com" aria-label="X (Twitter)" target="_blank" rel="noopener noreferrer">
            <FaXTwitter size={14} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn size={14} aria-hidden="true" />
          </SocialLink>
          <SocialLink href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={14} aria-hidden="true" />
          </SocialLink>
        </SocialRow>
      </FooterTop>
      <FooterMiddle>
        <NavLinks aria-label="Footer navigation">
          <FooterLink to="/">About</FooterLink>
          <FooterLink to="/">Contact</FooterLink>
          <FooterLink to="/">Pricing</FooterLink>
          <FooterLink to="/">Blog</FooterLink>
          <FooterLink to="/">Contact Us</FooterLink>
        </NavLinks>
        <FooterEmail href="mailto:hello@agentwisemarketing.com">
          hello@agentwisemarketing.com
        </FooterEmail>
      </FooterMiddle>
      <FooterBottom>
        <Copyright>&copy; {new Date().getFullYear()} Agentwise. All rights reserved.</Copyright>
        <LegalLinks>
          <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
          <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
        </LegalLinks>
      </FooterBottom>
    </SectionContainer>
  </Footer>
);

export default HomeFooter;
