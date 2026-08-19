import { useEffect, useState, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { isAxiosError } from 'axios';
import apiClient from '../../lib/api/client';
import type { ApiErrorResponse } from '../../types/api';
import Spinner from '../ui/Spinner';
import { breakpoints } from '../../theme/breakpoints';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #1a1a1a 0%, #0f0f0f 100%);
  padding: 40px 24px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
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
  margin-bottom: 40px;
`;

const IconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(200, 164, 126, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
`;

const MailSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c8a47e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13 2 4" />
  </svg>
);

const CheckSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ErrorSvg = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff2f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const Heading = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.3;
  color: #ffffff;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  max-width: 360px;
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 32px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: var(--accent);
  border-radius: 10px;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const InfoText = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 24px;
  max-width: 340px;
`;

type Status = 'verifying' | 'success' | 'error' | 'no-token';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'no-token');
  const [errorMessage, setErrorMessage] = useState('');

  const verify = useCallback(async (verifyToken: string) => {
    try {
      await apiClient.post('/auth/verify-email', { token: verifyToken });
      setStatus('success');
    } catch (error: unknown) {
      setStatus('error');
      if (isAxiosError<ApiErrorResponse>(error) && error.response?.data?.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Verification failed. The link may have expired or is invalid.');
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      verify(token);
    }
  }, [token, verify]);

  return (
    <Wrapper>
      <Card>
        <Logo>Agentwise</Logo>
        <LogoSub>real estate marketing</LogoSub>

        {status === 'verifying' && (
          <>
            <IconCircle>
              <MailSvg />
            </IconCircle>
            <Heading>Verifying Your Email</Heading>
            <Description>Please wait while we verify your email address.</Description>
            <Spinner size={32} />
          </>
        )}

        {status === 'success' && (
          <>
            <IconCircle>
              <CheckSvg />
            </IconCircle>
            <Heading>Email Verified</Heading>
            <Description>
              Your email has been verified successfully. You can now sign in to your account.
            </Description>
            <ActionLink to="/signin">Sign In</ActionLink>
          </>
        )}

        {status === 'error' && (
          <>
            <IconCircle>
              <ErrorSvg />
            </IconCircle>
            <Heading>Verification Failed</Heading>
            <Description>
              {errorMessage || 'The verification link may have expired or is invalid. Please try signing up again.'}
            </Description>
            <ActionLink to="/signup">Sign Up Again</ActionLink>
          </>
        )}

        {status === 'no-token' && (
          <>
            <IconCircle>
              <MailSvg />
            </IconCircle>
            <Heading>Check Your Email</Heading>
            <Description>
              We&apos;ve sent a verification email to your address. Click the link in the email to activate your account.
            </Description>
            <InfoText>
              This verification link will expire in 24 hours. If you didn&apos;t create an account on Agentwise, you can safely ignore this email.
            </InfoText>
          </>
        )}
      </Card>
    </Wrapper>
  );
}
