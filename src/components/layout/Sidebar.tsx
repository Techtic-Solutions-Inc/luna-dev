import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: ${tokens.spacing['gap-8']};
  padding: ${tokens.spacing['padding-16']};
  background: var(--color-32);
  border-bottom: 1px solid var(--color-42);

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: column;
    border-bottom: 0;
    border-right: 1px solid var(--color-42);
  }
`;

const Item = styled(NavLink)`
  color: var(--text-primary);
  text-decoration: none;
  font-family: ${tokens.typography['body-sm-38'].fontFamily}, sans-serif;
  font-size: ${tokens.typography['body-sm-38'].fontSize};
  font-weight: ${tokens.typography['body-sm-38'].fontWeight};
  line-height: ${tokens.typography['body-sm-38'].lineHeight};
  border-radius: ${tokens.radius['radius-6']};
  padding: ${tokens.spacing['padding-8']} ${tokens.spacing['padding-12']};

  &.active {
    background: var(--color-54);
  }
`;

const Sidebar = () => (
  <Nav aria-label="Primary">
    <Item to="/" end>
      Home
    </Item>
  </Nav>
);

export default Sidebar;
