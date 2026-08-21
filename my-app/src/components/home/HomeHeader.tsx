import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container, PrimaryButton } from './shared';

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors['color-16']}ee;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-63']};
`;

const HeaderInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing['gap-24']};
  padding-top: ${({ theme }) => theme.spacing['padding-20']};
  padding-bottom: ${({ theme }) => theme.spacing['padding-20']};
`;

const Logo = styled.div`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 28px;
  font-weight: 500;
  line-height: 1.2;
  color: ${({ theme }) => theme.colors.secondary};
  white-space: nowrap;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-36']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-16']};
`;

const LoginLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['padding-10']}
    ${({ theme }) => theme.spacing['padding-24']};
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius['radius-100']};
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const CompactButton = styled(PrimaryButton)`
  padding: ${({ theme }) => theme.spacing['padding-10']}
    ${({ theme }) => theme.spacing['padding-24']};
  font-size: 14px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Content', href: '#content' },
  { label: 'Blog', href: '#blog' },
  { label: 'Pricing', href: '#pricing' },
];

const HomeHeader = () => (
  <HeaderBar role="banner">
    <HeaderInner>
      <Logo aria-label="Agentwise home">Agentwise</Logo>
      <Nav aria-label="Primary navigation">
        {navItems.map((item) => (
          <NavLink key={item.label} href={item.href}>
            {item.label}
          </NavLink>
        ))}
      </Nav>
      <Actions>
        <CompactButton type="button" aria-label="Get started with Agentwise">
          Get Started
        </CompactButton>
        <LoginLink to="/signin" aria-label="Log in to Agentwise">
          Login
        </LoginLink>
      </Actions>
    </HeaderInner>
  </HeaderBar>
);

export default HomeHeader;
