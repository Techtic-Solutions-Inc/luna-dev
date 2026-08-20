import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../../lib/auth/storage';
import { colors, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import AuthLayout from '../../layout/AuthLayout';
import SignInForm from './SignInForm';

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap6};
  text-align: center;
`;

const Logo = styled.p`
  margin: 0;
  font-family: 'Kalam', cursive;
  font-size: 42px;
  font-weight: 700;
  line-height: 1.1;
  color: ${colors.secondary};
`;

const Tagline = styled.p`
  margin: 0;
  ${typographyStyle('caption57')}
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${colors.color93};
`;

const Heading = styled.h1`
  margin: 0;
  text-align: center;
  color: ${colors.secondary};
  ${typographyStyle('headingXl44')}
`;

const Subheading = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
  max-width: 360px;
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap12};
  margin-bottom: ${spacing.gap8};
`;

export default function SignInPage() {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return (
    <AuthLayout>
      <Brand>
        <Logo>Agentwise</Logo>
        <Tagline>Real Estate Marketing</Tagline>
      </Brand>
      <HeaderBlock>
        <Heading>Welcome To Agentwise</Heading>
        <Subheading>Everything you need to create standout real estate content.</Subheading>
      </HeaderBlock>
      <SignInForm />
    </AuthLayout>
  );
}
