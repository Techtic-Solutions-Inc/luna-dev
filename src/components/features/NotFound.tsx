import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing['padding-40']};
  gap: ${({ theme }) => theme.spacing['gap-16']};
  text-align: center;
  background-color: ${({ theme }) => theme.colors['color-16']};
  color: ${({ theme }) => theme.colors.secondary};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography['heading-lg-31'].fontFamily};
  font-size: ${({ theme }) => theme.typography['heading-lg-31'].fontSize};
  font-weight: ${({ theme }) => theme.typography['heading-lg-31'].fontWeight};
  line-height: ${({ theme }) => theme.typography['heading-lg-31'].lineHeight};
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.body.fontFamily};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
  color: ${({ theme }) => theme.colors['color-61']};
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['padding-12']} ${theme.spacing['padding-30']}`};
  border-radius: ${({ theme }) => theme.radius['radius-10000']};
  background-color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography['body-sm-2'].fontFamily};
  font-size: ${({ theme }) => theme.typography['body-sm-2'].fontSize};
  color: ${({ theme }) => theme.colors['color-20']};
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors['color-56']};
  }
`;

const NotFound = () => (
  <Page>
    <Title>Page Not Found</Title>
    <Description>The page you are looking for does not exist.</Description>
    <HomeLink to="/">Return Home</HomeLink>
  </Page>
);

export default NotFound;
