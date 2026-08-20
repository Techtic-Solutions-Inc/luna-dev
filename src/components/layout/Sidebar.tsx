import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

const Aside = styled.aside`
  width: 220px;
  flex-shrink: 0;
  background: ${colors.color36};
  color: ${colors.secondary};
  padding: ${spacing.padding24} ${spacing.padding16};
  min-height: calc(100vh - 64px);
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap12};
`;

const Item = styled(NavLink)`
  display: block;
  padding: ${spacing.padding10} ${spacing.padding12};
  border-radius: 8px;
  text-decoration: none;
  color: ${colors.color93};
  ${typographyStyle('bodySm2')}

  &.active,
  &:hover {
    background: ${colors.color49};
    color: ${colors.secondary};
  }
`;

export default function Sidebar() {
  return (
    <Aside aria-label="Sidebar">
      <List>
        <li>
          <Item to="/" end>
            Home
          </Item>
        </li>
        <li>
          <Item to="/login">Sign In</Item>
        </li>
      </List>
    </Aside>
  );
}
