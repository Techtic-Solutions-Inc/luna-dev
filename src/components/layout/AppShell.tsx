import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

const Shell = styled.div`
  background-color: ${({ theme }) => theme.colors['color-20']};
`;

const AppShell = ({ children }: AppShellProps) => (
  <Shell className="flex min-h-screen flex-col text-white">
    <Header />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  </Shell>
);

export default AppShell;
