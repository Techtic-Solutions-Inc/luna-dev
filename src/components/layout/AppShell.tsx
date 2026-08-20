import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { breakpoints } from '../../theme/breakpoints';
import { tokens } from '../../theme/tokens';

const Shell = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background: var(--secondary);

  @media (min-width: ${breakpoints.tablet}) {
    grid-template-columns: 220px 1fr;
    grid-template-rows: auto 1fr;
  }
`;

const Content = styled.main`
  padding: ${tokens.spacing['padding-20']};
  min-width: 0;
`;

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <Shell>
    <Header />
    <Sidebar />
    <Content>{children}</Content>
  </Shell>
);

export default AppShell;
