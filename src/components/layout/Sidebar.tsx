import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { cn } from '@/lib/utils';
import { breakpoints } from '@/theme/breakpoints';
import { spacing } from '@/theme/tokens';

const links = [{ to: '/app', label: 'Workspace' }];

const Nav = styled.nav`
  min-height: 100%;
  width: 14rem;
  border-bottom: 0;
  border-right: 1px solid var(--ui-border);
  background: var(--secondary);
  padding: ${spacing['padding-12']};

  @media (max-width: ${breakpoints.tablet}) {
    min-height: 0;
    width: auto;
    border-right: 0;
    border-bottom: 1px solid var(--ui-border);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${spacing['gap-8']};

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: row;
  }
`;

export default function Sidebar() {
  return (
    <Nav aria-label="Main navigation">
      <List>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-3 py-2 text-sm hover:bg-muted focus-visible:outline-none',
                  isActive ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'
                )
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </List>
    </Nav>
  );
}
