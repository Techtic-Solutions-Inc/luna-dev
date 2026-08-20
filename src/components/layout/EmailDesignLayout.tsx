import styled from 'styled-components';

interface EmailDesignLayoutProps {
  children: React.ReactNode;
}

const Page = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors['color-33']};
`;

const Frame = styled.main`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 640px;
`;

const EmailDesignLayout = ({ children }: EmailDesignLayoutProps) => (
  <Page className="px-4 py-8">
    <Frame>{children}</Frame>
  </Page>
);

export default EmailDesignLayout;
