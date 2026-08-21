import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: ${({ theme }) => theme.spacing.gap};
  text-align: center;
  background-color: ${({ theme }) => theme.colors['color-16']};
  color: ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.padding};
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.heading};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.secondary};
`;

const HomeLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  font-size: ${({ theme }) => theme.typography.bodySize};
  text-decoration: underline;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`;

const NotFound = () => (
  <Container role="region" aria-labelledby="not-found-heading">
    <Title id="not-found-heading">404 - Not Found</Title>
    <HomeLink to="/home" aria-label="Return to home page">
      Go to Home
    </HomeLink>
  </Container>
);

export default NotFound;
