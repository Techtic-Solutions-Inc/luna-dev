import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface WelcomeLocationState {
  title?: string;
  message?: string;
  description?: string;
  name?: string;
}

const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
`;

const Card = styled.div`
  width: min(100%, 32rem);
  padding: ${({ theme }) => theme.spacing[8]};
  border: 1px solid var(--color-border);
  border-radius: ${({ theme }) => theme.borders.radii['2xl']};
  background: var(--color-surface);
  box-shadow: ${({ theme }) => theme.shadows.md};
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.display};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
`;

const Message = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  color: var(--color-text-primary);
  font-size: ${({ theme }) => theme.typography.fontSizes.lg};
`;

const Description = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  color: var(--color-text-secondary);
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[5]}`};
  border-radius: ${({ theme }) => theme.borders.radii.lg};
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  text-decoration: none;

  &:hover {
    background: var(--color-brand-primary-hover);
  }
`;

const Welcome = () => {
  const location = useLocation();
  const state = (location.state as WelcomeLocationState | null) ?? {};

  return (
    <Page>
      <Card>
        <Title>{state.title ?? 'Welcome aboard'}</Title>
        <Message>
          {state.message ??
            (state.name
              ? `Your account has been created, ${state.name}.`
              : 'Your account has been created successfully.')}
        </Message>
        {state.description ? <Description>{state.description}</Description> : null}
        <StyledLink to="/signin">Continue to sign in</StyledLink>
      </Card>
    </Page>
  );
};

export default Welcome;
