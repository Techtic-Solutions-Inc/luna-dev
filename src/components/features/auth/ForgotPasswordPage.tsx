import type { FormEvent } from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import AuthLayout from '../../layout/AuthLayout';
import Alert from '../../ui/Alert';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.gap6};
  text-align: center;
`;

const Logo = styled.p`
  margin: 0;
  color: ${colors.secondary};
  ${typographyStyle('headingLg108')}
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

const Description = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
  max-width: ${spacing.gap465};
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

export default function ForgotPasswordPage() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <AuthLayout showCollageOverlays={false}>
      <Brand>
        <Logo>Agentwise</Logo>
        <Tagline>Real Estate Marketing</Tagline>
      </Brand>
      <Heading>Reset Password</Heading>
      <Description>
        Enter the email address you used to create your account and we&apos;ll send you a link to
        reset your password.
      </Description>
      <Form onSubmit={onSubmit} noValidate>
        <Alert variant="error">
          Password reset is unavailable until the reset-link API contract is ready. Sign in if you
          already have access, or try again later.
        </Alert>
        <Input
          id="forgot-email"
          name="email"
          type="email"
          label="Email"
          hideLabel
          placeholder="Email"
          autoComplete="email"
          disabled
        />
        <Button type="submit" variant="accent" shape="pill" disabled>
          Send me a link
        </Button>
      </Form>
    </AuthLayout>
  );
}
