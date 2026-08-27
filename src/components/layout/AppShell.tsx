import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';
import { breakpoints } from '@/theme/breakpoints';
import { spacing } from '@/theme/tokens';

const ShellBody = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: ${spacing['padding-24']};

  @media (max-width: ${breakpoints.tablet}) {
    padding: ${spacing['padding-16']};
  }
`;

export default function AppShell() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to main content
      </a>
      <Header />
      <ShellBody>
        <Sidebar />
        <Main id="main" tabIndex={-1}>
          <Outlet />
        </Main>
      </ShellBody>
    </div>
  );
}
