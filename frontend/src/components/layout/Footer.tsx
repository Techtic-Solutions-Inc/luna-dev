import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FOOTER_NAV_LINKS = [
  { label: 'About', to: '/about-us' },
  { label: 'Blog', to: '/blog' },
  { label: 'Content', to: '/content' },
  { label: 'Get Started', to: '/get-started' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Log in', to: '/login' },
] as const;

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Contact Us', to: '/contact' },
] as const;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  gap: var(--gap-24);
  padding: var(--padding-32) 0;
  border-top: 1px solid var(--color-58);
  color: var(--secondary);

  @media (max-width: 768px) {
    padding: var(--padding-24) 0;
    gap: var(--gap-20);
  }
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: var(--gap-32);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: var(--gap-24);
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
`;

const FooterHeading = styled.h2`
  font-family: var(--font-body-family);
  font-size: var(--font-body-size);
  font-weight: 400;
  line-height: var(--font-body-line-height);
  color: var(--secondary);
`;

const FooterNavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--gap-12) var(--gap-20);
`;

const FooterLinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--gap-10);
`;

const FooterNavLink = styled(Link)`
  font-family: var(--font-body-family);
  font-size: var(--font-body-size);
  font-weight: var(--font-body-weight);
  line-height: var(--font-body-line-height);
  color: var(--secondary);

  &:hover {
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const EmailLink = styled.a`
  font-family: var(--font-body-family);
  font-size: var(--font-body-size);
  font-weight: var(--font-body-weight);
  line-height: var(--font-body-line-height);
  color: var(--accent);
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Copyright = styled.p`
  font-family: var(--font-body-family);
  font-size: var(--font-body-size);
  font-weight: var(--font-body-weight);
  line-height: var(--font-body-line-height);
  color: var(--color-93);
`;

const Footer = () => (
  <StyledFooter>
    <FooterTop>
      <FooterColumn>
        <FooterHeading>Contact Information</FooterHeading>
        <EmailLink href="mailto:hello@agentwisemarketing.com">
          hello@agentwisemarketing.com
        </EmailLink>
        <FooterNavList aria-label="Site">
          {FOOTER_NAV_LINKS.map((link) => (
            <li key={link.to}>
              <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
            </li>
          ))}
        </FooterNavList>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Legal</FooterHeading>
        <FooterLinkList aria-label="Legal">
          {LEGAL_LINKS.map((link) => (
            <li key={link.to}>
              <FooterNavLink to={link.to}>{link.label}</FooterNavLink>
            </li>
          ))}
        </FooterLinkList>
      </FooterColumn>
    </FooterTop>
    <Copyright>© 2026 Agentwise. All Rights Reserved.</Copyright>
  </StyledFooter>
);

export default Footer;
