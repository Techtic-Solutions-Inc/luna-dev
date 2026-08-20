import type { ReactNode } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme/tokens';
import Header from './Header';
import Sidebar from './Sidebar';

type AppShellProps = {
  children: ReactNode;
};

const Shell = styled.div`
  min-height: 100vh;
  background: ${colors.color21};
`;

const Body = styled.div`
  display: flex;
  min-height: calc(100vh - 64px);
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
`;

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
