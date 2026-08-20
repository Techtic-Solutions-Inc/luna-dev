import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AppShell from '../layout/AppShell';

const Page = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px);
  padding: ${({ theme }) => theme.spacing['padding-40']};
  gap: ${({ theme }) => theme.spacing['gap-16']};
  text-align: center;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  line-height: ${({ theme }) => theme.typography['heading-lg-31'].lineHeight};
  color: ${({ theme }) => theme.colors['color-20']};
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: ${({ theme }) => theme.typography.body.fontWeight};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['padding-12']} ${theme.spacing['padding-24']}`};
  border-radius: ${({ theme }) => theme.radius['radius-10']};
  background-color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography['body-sm-29'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-29'].fontSize};
  font-weight: ${({ theme }) => theme.typography['body-sm-29'].fontWeight};
  line-height: ${({ theme }) => theme.typography['body-sm-29'].lineHeight};
  color: ${({ theme }) => theme.colors['color-20']};

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-54']};
  }
`;

const NotFound = () => (
  <AppShell>
    <Page>
      <Title>Page Not Found</Title>
      <Description>The page you are looking for does not exist.</Description>
      <HomeLink to="/">Return Home</HomeLink>
    </Page>
  </AppShell>
);

export default NotFound;
