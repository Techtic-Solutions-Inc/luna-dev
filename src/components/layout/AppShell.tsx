import type { ReactNode } from 'react';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

interface AppShellProps {
  children: ReactNode;
}

const AppShell = ({ children }: AppShellProps) => (
  <Shell>
    <Header />
    <Body>
      <Sidebar />
      <Main>{children}</Main>
    </Body>
  </Shell>
);

export default AppShell;
