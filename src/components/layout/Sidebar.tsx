import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';

const Nav = styled.nav`
  width: 240px;
  min-height: 0;
  background: var(--secondary);
  border-right: 1px solid var(--color-42);
  padding: 24px 16px;

  @media (max-width: ${breakpoints.tablet}) {
    display: none;
  }
`;

export default function Sidebar() {
  return <Nav aria-label="Main navigation" />;
}
