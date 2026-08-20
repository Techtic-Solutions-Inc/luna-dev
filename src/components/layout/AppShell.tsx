import styled from 'styled-components';
import type { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Shell = styled.div`
  min-height: 100vh;
  background: var(--color-29);
`;

const Body = styled.div`
  display: flex;
  min-height: calc(100vh - 73px);
`;

const Main = styled.main`
  flex: 1;
  padding: var(--padding-32);
`;

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <Shell>
      <Header />
      <Body>
        <Sidebar />
        <Main>{children}</Main>
      </Body>
    </Shell>
  );
}
