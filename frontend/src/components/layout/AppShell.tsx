import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUser, FaSignInAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { clearAuthToken, useAuth } from '../../hooks/useAuth';

interface AppShellProps {
  children: ReactNode;
}

const Shell = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background: var(--color-29);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
  }
`;

const Header = styled.header`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--padding-16) var(--padding-24);
  background: var(--color-20);
  color: var(--secondary);
  border-bottom: 1px solid var(--color-58);
`;

const Brand = styled.span`
  font-family: var(--font-heading-lg-28-family);
  font-size: var(--font-heading-lg-28-size);
  font-weight: var(--font-heading-lg-28-weight);
  line-height: var(--font-heading-lg-28-line-height);
  color: var(--accent);
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: var(--gap-12);
`;

const Sidebar = styled.aside`
  padding: var(--padding-24) var(--padding-16);
  background: var(--color-61);
  border-right: 1px solid var(--color-58);

  @media (max-width: 768px) {
    border-right: none;
    border-bottom: 1px solid var(--color-58);
    padding: var(--padding-12) var(--padding-16);
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--gap-8);

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-flex;
  align-items: center;
  gap: var(--gap-8);
  padding: var(--padding-10) var(--padding-12);
  border-radius: var(--radius-6);
  color: var(--color-93);
  font-family: var(--font-body-sm-37-family);
  font-size: var(--font-body-sm-37-size);
  font-weight: var(--font-body-sm-37-weight);
  line-height: var(--font-body-sm-37-line-height);

  &.active {
    background: var(--color-26);
    color: var(--accent);
  }

  &:hover {
    background: var(--color-49);
    color: var(--secondary);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const Main = styled.main`
  padding: var(--padding-24);
  overflow: auto;

  @media (max-width: 768px) {
    padding: var(--padding-16);
  }
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid var(--color-58);
  color: var(--secondary);
  border-radius: var(--radius-6);
  padding: var(--padding-6) var(--padding-12);
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const AppShell = ({ children }: AppShellProps) => {
  const { isAuthenticated } = useAuth();

  const handleLogout = (): void => {
    clearAuthToken();
    window.location.assign('/login');
  };

  return (
    <Shell>
      <Header>
        <Brand>Sofia</Brand>
        <HeaderActions>
          {isAuthenticated ? (
            <LogoutButton type="button" onClick={handleLogout}>
              Sign out
            </LogoutButton>
          ) : null}
        </HeaderActions>
      </Header>
      <Sidebar aria-label="Primary">
        <NavList>
          <StyledNavLink to="/" end>
            <FaHome aria-hidden="true" />
            Home
          </StyledNavLink>
          <StyledNavLink to="/profile">
            <FaUser aria-hidden="true" />
            Profile
          </StyledNavLink>
          {!isAuthenticated ? (
            <StyledNavLink to="/login">
              <FaSignInAlt aria-hidden="true" />
              Login
            </StyledNavLink>
          ) : null}
        </NavList>
      </Sidebar>
      <Main id="main-content">{children}</Main>
    </Shell>
  );
};

export default AppShell;
