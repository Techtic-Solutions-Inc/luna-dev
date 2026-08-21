import styled from 'styled-components';
import type { ReactNode } from 'react';
import { FaHome } from 'react-icons/fa';

const LayoutContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 240px 1fr;
  grid-template-areas:
    'header header'
    'sidebar main';
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'main';
  }
`;

const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.gap};
  padding: ${({ theme }) => theme.spacing.padding};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.dropShadow};
`;

const Sidebar = styled.aside`
  grid-area: sidebar;
  padding: ${({ theme }) => theme.spacing.padding};
  background-color: ${({ theme }) => theme.colors['color-22']};
  color: ${({ theme }) => theme.colors.secondary};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

const Main = styled.main`
  grid-area: main;
  padding: ${({ theme }) => theme.spacing.padding};
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const HeaderTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: ${({ theme }) => theme.typography.bodySize};
  font-weight: 400;
  margin: 0;
`;

const NavLabel = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['gap-8']};
  font-size: ${({ theme }) => theme.typography.bodySize};
`;

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => (
  <LayoutContainer>
    <Header role="banner">
      <HeaderTitle>App</HeaderTitle>
    </Header>
    <Sidebar role="navigation" aria-label="Main navigation">
      <NavLabel>
        <FaHome aria-hidden="true" />
        Navigation
      </NavLabel>
    </Sidebar>
    <Main role="main">{children}</Main>
  </LayoutContainer>
);

export default AppLayout;
