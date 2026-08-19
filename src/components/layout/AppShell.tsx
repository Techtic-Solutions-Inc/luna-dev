import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 24px;
  overflow-y: auto;
`;

const SkipLink = styled.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;

  &:focus {
    position: static;
    width: auto;
    height: auto;
    padding: 8px 16px;
    background: var(--accent);
    color: var(--secondary);
    z-index: 100;
  }
`;

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <Header />
      <Body>
        <Sidebar />
        <Main id="main-content">{children}</Main>
      </Body>
    </Layout>
  );
}
