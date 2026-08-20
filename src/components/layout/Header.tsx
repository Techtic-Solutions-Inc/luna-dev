import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, spacing } from '../../theme/tokens';
import { typographyStyle } from '../../theme/typography';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.padding16} ${spacing.padding24};
  background: ${colors.color16};
  color: ${colors.secondary};
`;

const Brand = styled(Link)`
  text-decoration: none;
  color: ${colors.secondary};
  ${typographyStyle('headingLg31')}
`;

const Nav = styled.nav`
  display: flex;
  gap: ${spacing.gap16};
  ${typographyStyle('caption4')}

  a {
    color: ${colors.color93};
    text-decoration: none;
  }

  a:hover {
    color: ${colors.accent};
  }
`;

export default function Header() {
  return (
    <Bar>
      <Brand to="/">Agentwise</Brand>
      <Nav aria-label="Primary">
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </Nav>
    </Bar>
  );
}
