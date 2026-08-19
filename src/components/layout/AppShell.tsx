import styled from 'styled-components';
import Sidebar from './Sidebar';

interface AppShellProps {
  children: React.ReactNode;
}

const ShellWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #1a1a19;
`;

const MainContent = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const AppShell: React.FC<AppShellProps> = ({ children }) => (
  <ShellWrapper>
    <Sidebar />
    <MainContent>{children}</MainContent>
  </ShellWrapper>
);

export default AppShell;
