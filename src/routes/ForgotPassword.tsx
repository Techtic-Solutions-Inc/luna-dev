import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => `${theme.spacing[8]} ${theme.spacing[4]}`};
`;

const Card = styled.div`
  width: min(100%, 28rem);
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.serif};
  font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};
  color: var(--color-text-primary);
`;

const Text = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  font-family: ${({ theme }) => theme.typography.fontFamilies.sans};
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  color: var(--color-text-secondary);
`;

const StyledLink = styled(Link)`
  color: var(--color-text-link);
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-decoration: underline;
`;

const ForgotPassword = () => (
  <Page>
    <Card>
      <Title>Forgot your password?</Title>
      <Text>
        Enter the email address associated with your account and we will send
        you instructions to reset your password.
      </Text>
      <StyledLink to="/signin">Back to sign in</StyledLink>
    </Card>
  </Page>
);

export default ForgotPassword;
