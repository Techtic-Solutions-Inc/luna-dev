import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../ui/Button';
import { SectionContainer } from './homeStyles';

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors['color-16']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-41']};
`;

const HeaderInner = styled(SectionContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
  padding-top: 0;
  padding-bottom: 0;
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  line-height: ${({ theme }) => theme.typography['heading-lg-31'].lineHeight};
  color: ${({ theme }) => theme.colors.secondary};
  white-space: nowrap;
`;

const Nav = styled.nav`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-36']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  line-height: ${({ theme }) => theme.typography['body-sm-2'].lineHeight};
  color: ${({ theme }) => theme.colors.secondary};
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
`;

const HomeHeader = () => (
  <HeaderBar>
    <HeaderInner>
      <Logo to="/home" aria-label="Agentwise home">
        Agentwise
      </Logo>
      <Nav aria-label="Primary navigation">
        <NavLink to="/home">Apps</NavLink>
        <NavLink to="/home">Content</NavLink>
        <NavLink to="/home">Blog</NavLink>
        <NavLink to="/home">Pricing</NavLink>
      </Nav>
      <Actions>
        <Button variant="primary" size="sm" aria-label="Get started">
          Get Started
        </Button>
        <Button variant="outline" size="sm" aria-label="Login">
          Login
        </Button>
      </Actions>
    </HeaderInner>
  </HeaderBar>
);

export default HomeHeader;
