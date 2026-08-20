import { NavLink } from 'react-router-dom';
import { FiHome, FiGrid } from 'react-icons/fi';
import styled from 'styled-components';

const SidebarNav = styled.nav`
  display: none;
  flex-direction: column;
  width: 240px;
  min-height: calc(100vh - 64px);
  padding: ${({ theme }) => theme.spacing['padding-16']};
  gap: ${({ theme }) => theme.spacing['gap-4']};
  background-color: ${({ theme }) => theme.colors['color-33']};
  border-right: 1px solid ${({ theme }) => theme.colors['color-41']};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-12']};
  padding: ${({ theme }) => theme.spacing['padding-12']};
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  font-weight: ${({ theme }) => theme.typography['body-sm-2'].fontWeight};
  line-height: ${({ theme }) => theme.typography['body-sm-2'].lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};
  transition: background-color 0.15s ease, color 0.15s ease;

  &.active {
    background-color: ${({ theme }) => theme.colors['color-41']};
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-41']};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Sidebar = () => (
  <SidebarNav aria-label="Main navigation">
    <NavItem to="/" end>
      <FiHome size={18} aria-hidden="true" />
      Home
    </NavItem>
    <NavItem to="/dashboard">
      <FiGrid size={18} aria-hidden="true" />
      Dashboard
    </NavItem>
  </SidebarNav>
);

export default Sidebar;
