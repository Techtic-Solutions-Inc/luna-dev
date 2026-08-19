import styled from 'styled-components';
import Sidebar from './Sidebar';
import { AppLayoutProvider } from '../../contexts/AppLayoutContext';

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

const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 9999;

  &:focus {
    position: fixed;
    top: 8px;
    left: 8px;
    width: auto;
    height: auto;
    padding: 8px 16px;
    background: #c8a47e;
    color: #1a1a19;
    font-family: 'Almarai', sans-serif;
    font-size: 14px;
    border-radius: 8px;
    text-decoration: none;
  }
`;

const AppShell: React.FC<AppShellProps> = ({ children }) => (
  <AppLayoutProvider>
    <ShellWrapper>
      <SkipLink href="#main-content">Skip to content</SkipLink>
      <Sidebar />
      <MainContent id="main-content">{children}</MainContent>
    </ShellWrapper>
  </AppLayoutProvider>
);

export default AppShell;
