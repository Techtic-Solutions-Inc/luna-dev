import { useState } from 'react';
import type { FormEvent } from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../../theme/tokens';
import { typographyStyle } from '../../../theme/typography';
import AuthLayout from '../../layout/AuthLayout';
import Alert from '../../ui/Alert';
import Button from '../../ui/Button';
import Input from '../../ui/Input';
import { useForgotPassword } from '../../../hooks/useForgotPassword';

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

const Description = styled.p`
  margin: 0;
  text-align: center;
  color: ${colors.color93};
  ${typographyStyle('bodySm38')}
  max-width: 380px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.gap16};
`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [clientError, setClientError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { submit, isLoading, error, fieldErrors, clearError } = useForgotPassword();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    clearError();
    setSuccessMessage(null);

    const nextEmail = email.trim();
    if (!nextEmail) {
      setClientError('Email is required');
      return;
    }
    if (!EMAIL_PATTERN.test(nextEmail)) {
      setClientError('Enter a valid email address');
      return;
    }

    const result = await submit({ email: nextEmail });
    if (result) {
      setClientError(null);
      setSuccessMessage(result.message);
    }
  };

  let formAlert: string | null = null;
  if (error) {
    if (error.statusCode === 400 && Object.keys(fieldErrors).length > 0) {
      formAlert = null;
    } else {
      formAlert = typeof error.message === 'string' ? error.message : null;
      if (!formAlert) {
        formAlert = 'Unable to connect. Check your connection and try again.';
      }
    }
  }

  const inputError = clientError ?? fieldErrors.email ?? undefined;

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
        {successMessage ? <Alert variant="success">{successMessage}</Alert> : null}
        {formAlert ? <Alert variant="error">{formAlert}</Alert> : null}

        {!successMessage ? (
          <>
            <Input
              id="forgot-email"
              name="email"
              type="email"
              label="Email"
              hideLabel
              placeholder="Email"
              autoComplete="email"
              value={email}
              disabled={isLoading}
              error={inputError}
              onChange={(e) => {
                setEmail(e.target.value);
                setClientError(null);
              }}
            />
            <Button type="submit" variant="accent" isLoading={isLoading}>
              Send me a link
            </Button>
          </>
        ) : null}
      </Form>
    </AuthLayout>
  );
}
