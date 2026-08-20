import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import styled from 'styled-components';

const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 ${({ theme }) => theme.spacing['padding-24']};
  background-color: ${({ theme }) => theme.colors['color-20']};
  border-bottom: 1px solid ${({ theme }) => theme.colors['color-41']};
`;

const Logo = styled(Link)`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  line-height: ${({ theme }) => theme.typography['heading-lg-31'].lineHeight};
  color: ${({ theme }) => theme.colors.secondary};
`;

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius['radius-8']};
  color: ${({ theme }) => theme.colors.secondary};

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-41']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Header = () => (
  <HeaderBar>
    <Logo to="/" aria-label="Agentwise home">
      Agentwise
    </Logo>
    <MenuButton type="button" aria-label="Open navigation menu">
      <FiMenu size={24} aria-hidden="true" />
    </MenuButton>
  </HeaderBar>
);

export default Header;
