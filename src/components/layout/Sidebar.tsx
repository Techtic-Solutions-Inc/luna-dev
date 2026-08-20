import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { typographyStyle } from '../../theme/typography';

const Aside = styled.aside`
  width: 240px;
  padding: var(--padding-24);
  background: var(--color-33);
  border-right: 1px solid var(--color-44);
  min-height: calc(100vh - 73px);
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: var(--padding-12);
`;

const LinkItem = styled(NavLink)`
  ${typographyStyle('body-sm-2')}
  color: var(--secondary);
  text-decoration: none;
  padding: var(--padding-8) var(--padding-12);
  border-radius: var(--radius-8);

  &.active {
    background: var(--color-26);
    color: var(--accent);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export default function Sidebar() {
  return (
    <Aside>
      <NavList aria-label="Dashboard navigation">
        <LinkItem to="/dashboard" end>
          Dashboard
        </LinkItem>
      </NavList>
    </Aside>
  );
}
