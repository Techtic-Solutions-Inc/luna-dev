import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import AuthLayout from '../layout/AuthLayout';
import Spinner from '../ui/Spinner';
import { AuthInput, AuthErrorText, AuthSubmitButton, AuthApiError } from '../ui/FormPrimitives';
import apiClient from '../../lib/api/client';
import type { ApiErrorResponse } from '../../types/api';
import { isAxiosError } from 'axios';

const Form = styled.form`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled.span`
  font-family: 'EB Garamond', serif;
  font-size: 36px;
  font-style: italic;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 4px;
`;

const LogoSub = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 8px;
  font-weight: 400;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 32px;
`;

const Heading = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 30px;
  font-weight: 500;
  line-height: 39.15px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 32px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const ErrorText = styled(AuthErrorText)`
  margin-top: 6px;
  min-height: 18px;
`;

const SubmitButton = styled(AuthSubmitButton)`
  margin-top: 24px;
`;

const SuccessCard = styled.div`
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SuccessHeading = styled.h2`
  font-family: 'EB Garamond', serif;
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 12px;
`;

const SuccessText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
`;

function validateEmail(email: string): string {
  if (!email.trim()) return 'Email is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address.';
  return '';
}

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setApiError('');

    const err = validateEmail(email);
    setFieldError(err);
    if (err) return;

    setLoading(true);
    try {
      await apiClient.post('/auth/forgot-password', { email: email.trim() });
      setSuccess(true);
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        if (error.response?.status === 404) {
          setApiError('This feature is not yet available. The password reset endpoint has not been deployed.');
        } else if (error.response?.data?.message) {
          setApiError(error.response.data.message);
        } else {
          setApiError('Something went wrong. Please try again.');
        }
      } else {
        setApiError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      {success ? (
        <SuccessCard>
          <Logo>Agentwise</Logo>
          <LogoSub>real estate marketing</LogoSub>
          <SuccessHeading>Check your email</SuccessHeading>
          <SuccessText>
            We&apos;ve sent a password reset link to <strong>{email}</strong>. Check your inbox and
            follow the instructions to reset your password.
          </SuccessText>
        </SuccessCard>
      ) : (
        <Form onSubmit={handleSubmit} noValidate>
          <Logo>Agentwise</Logo>
          <LogoSub>real estate marketing</LogoSub>

          <Heading>Reset Password</Heading>
          <Description>
            Enter the email address you used to create your account and we&apos;ll send you a link
            to reset your password.
          </Description>

          <InputWrapper>
            <AuthInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldError) setFieldError(validateEmail(e.target.value));
              }}
              onBlur={() => setFieldError(validateEmail(email))}
              $hasError={!!fieldError}
              aria-label="Email"
              aria-invalid={!!fieldError}
              aria-describedby={fieldError ? 'email-error' : undefined}
              autoComplete="email"
            />
            <ErrorText id="email-error" role="alert">
              {fieldError}
            </ErrorText>
          </InputWrapper>

          <SubmitButton type="submit" disabled={loading} $loading={loading}>
            {loading ? <Spinner size={20} inline /> : 'Send me a link'}
          </SubmitButton>

          {apiError && <AuthApiError role="alert" style={{ marginTop: '16px' }}>{apiError}</AuthApiError>}
        </Form>
      )}
    </AuthLayout>
  );
}
