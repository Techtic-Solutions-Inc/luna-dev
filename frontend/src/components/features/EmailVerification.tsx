import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../lib/api/client';
import type { EmailVerifyResponse } from '../../types/api';
import Spinner from '../ui/Spinner';

type VerifyState = 'loading' | 'success' | 'error';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [state, setState] = useState<VerifyState>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  const verify = useCallback(async () => {
    if (!token) {
      setState('error');
      setErrorMessage('Verification token is missing. Please check the link in your email.');
      return;
    }

    try {
      await apiClient.post<EmailVerifyResponse>('/api/email/verify', { token });
      setState('success');
    } catch (err: unknown) {
      setState('error');
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMessage(err.response.data.message as string);
      } else {
        setErrorMessage('Verification failed. The link may have expired.');
      }
    }
  }, [token]);

  useEffect(() => {
    verify();
  }, [verify]);

  return (
    <div
      className="flex min-h-screen flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #1a1a19 0%, #2f271f 30%, #1a1a19 100%)' }}
    >
      {/* Header */}
      <div className="flex w-full flex-col items-center pt-8 pb-6">
        <span
          className="text-[32px] font-normal text-white"
          style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}
        >
          Agentwise
        </span>
        <span
          className="mt-[-2px] text-[8px] font-light tracking-[3px] text-[#c8a47e]"
          style={{ fontFamily: "'Almarai', sans-serif" }}
        >
          REAL ESTATE MARKETING
        </span>
      </div>

      {/* Hero section with gradient overlay */}
      <div className="relative w-full max-w-[660px] overflow-hidden">
        <div
          className="h-[60px] w-full"
          style={{
            background: 'linear-gradient(180deg, rgba(47,39,31,0.8) 0%, rgba(26,26,25,0.4) 100%)',
          }}
        />
      </div>

      {/* Mail icon */}
      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#c8a47e33]">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" stroke="#c8a47e" strokeWidth="1.5" />
          <path d="M2 7l10 7 10-7" stroke="#c8a47e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Heading */}
      <h1
        className="mt-5 text-center text-[30px] font-medium text-white"
        style={{ fontFamily: "'EB Garamond', serif", lineHeight: '39.15px' }}
      >
        Verify Your Email Address
      </h1>

      {/* Subtext */}
      <p
        className="mt-3 max-w-[480px] px-6 text-center text-[14px] font-light text-[#959595]"
        style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
      >
        You&apos;re one step away from accessing your Agentwise workspace. Click the button below to
        confirm your email.
      </p>

      {/* Main content card */}
      <div className="mt-8 w-full max-w-[660px] px-6">
        <div className="flex flex-col items-center rounded-t-none px-6 py-10 md:px-16">
          {state === 'loading' && (
            <div className="flex flex-col items-center gap-4">
              <Spinner size="lg" />
              <p
                className="text-center text-[14px] text-[#959595]"
                style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
              >
                Verifying your email address...
              </p>
            </div>
          )}

          {state === 'success' && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#22c55e33]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p
                  className="text-center text-[18px] font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  Email Verified Successfully
                </p>
                <p
                  className="max-w-[400px] text-center text-[14px] font-light text-[#959595]"
                  style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
                >
                  Your account has been activated. You can now sign in and start using Agentwise.
                </p>
              </div>
              <Link
                to="/sign-in"
                className="flex h-[48px] w-full max-w-[280px] items-center justify-center rounded-[10000px] text-[16px] font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                style={{
                  fontFamily: "'Almarai', sans-serif",
                  background: 'linear-gradient(90deg, #c8a47e 0%, #a3825e 100%)',
                }}
              >
                Go to Sign In
              </Link>
            </div>
          )}

          {state === 'error' && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#ff2f2f1a]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" stroke="#ff2f2f" strokeWidth="1.5" />
                  <line x1="15" y1="9" x2="9" y2="15" stroke="#ff2f2f" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="9" y1="9" x2="15" y2="15" stroke="#ff2f2f" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-3">
                <p
                  className="text-center text-[18px] font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', serif" }}
                >
                  Verification Failed
                </p>
                <p
                  className="max-w-[400px] text-center text-[14px] font-light text-[#959595]"
                  style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
                  role="alert"
                >
                  {errorMessage}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setState('loading');
                  verify();
                }}
                className="flex h-[48px] w-full max-w-[280px] items-center justify-center rounded-[10000px] text-[16px] font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                style={{
                  fontFamily: "'Almarai', sans-serif",
                  background: 'linear-gradient(90deg, #c8a47e 0%, #a3825e 100%)',
                }}
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        {/* Expiration notice */}
        <p
          className="mt-6 text-center text-[13px] font-light text-[#959595]"
          style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '20px' }}
        >
          This verification link will expire in 24 hours. If you didn&apos;t create an account on
          Agentwise, you can safely ignore this email.
        </p>

        {/* Warning box */}
        <div className="mt-8 flex gap-3 rounded-[8px] border border-[#646261] bg-[#1a1a19] px-5 py-4">
          <div className="mt-0.5 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2L1 21h22L12 2z"
                fill="#ffb032"
                stroke="#ffb032"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <line x1="12" y1="9" x2="12" y2="14" stroke="#1a1a19" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="1" fill="#1a1a19" />
            </svg>
          </div>
          <p
            className="text-[13px] font-normal text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '20px' }}
          >
            Never share this link with anyone. Agentwise staff will never ask you to forward this
            email. If you suspect unauthorised access, contact{' '}
            <a
              href="mailto:hello@agentwisemarketing.com"
              className="text-white underline transition-colors duration-200 hover:text-[#c8a47e]"
            >
              hello@agentwisemarketing.com
            </a>{' '}
            immediately.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 flex w-full max-w-[660px] flex-col items-center gap-4 border-t border-[#646261] px-6 py-8">
        <div className="flex items-center gap-6">
          <a
            href="/help"
            className="text-[13px] text-[#959595] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Help Center
          </a>
          <div className="h-4 w-px bg-[#646261]" />
          <a
            href="/privacy"
            className="text-[13px] text-[#959595] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Privacy Policy
          </a>
          <div className="h-4 w-px bg-[#646261]" />
          <a
            href="/terms"
            className="text-[13px] text-[#959595] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Terms of Service
          </a>
        </div>
        <p
          className="text-center text-[12px] font-light text-[#646261]"
          style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '18px' }}
        >
          &copy; 2026 Agentwise Inc. &middot; All rights reserved.
          <br />
          You&apos;re receiving this because you registered at agentwise.io
        </p>
      </div>
    </div>
  );
}
