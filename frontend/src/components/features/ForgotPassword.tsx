import { useState } from 'react';
import type { FormEvent } from 'react';
import axios from 'axios';
import apiClient from '../../lib/api/client';
import type { ForgotPasswordResponse } from '../../types/api';
import Spinner from '../ui/Spinner';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  function validateEmail(value: string): boolean {
    if (!value.trim()) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateEmail(email)) return;

    setFormState('loading');
    setErrorMessage('');

    try {
      await apiClient.post<ForgotPasswordResponse>('/api/auth/forgot-password', { email });
      setFormState('success');
    } catch (err: unknown) {
      setFormState('error');
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMessage(err.response.data.message as string);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left panel - form */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 md:w-[480px] md:min-w-[480px] md:px-16">
        {/* Dark gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #1a1a19 0%, #2f271f 50%, #1a1a19 100%)',
          }}
        />

        <div className="relative z-10 flex w-full max-w-[340px] flex-col items-center">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">
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

          {/* Heading */}
          <h1
            className="mb-3 text-center text-[28px] font-medium text-white"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '36.54px' }}
          >
            Reset Password
          </h1>

          {/* Instructional text */}
          <p
            className="mb-8 text-center text-[14px] font-light text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
          >
            Enter the email address you used to create your account and we&apos;ll send you a link to
            reset your password.
          </p>

          {formState === 'success' ? (
            <div className="flex w-full flex-col items-center gap-4 rounded-[10px] border border-[#3b6c4f] bg-[#22c55e19] px-6 py-5">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="20" cy="20" r="20" fill="#22c55e33" />
                <path
                  d="M14 20.5L18 24.5L26 16.5"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className="text-center text-[14px] font-normal text-[#d9d9d9]"
                style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
              >
                We&apos;ve sent a password reset link to{' '}
                <span className="font-bold text-white">{email}</span>. Check your inbox and follow
                the instructions.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
              {/* Email input */}
              <div className="flex flex-col gap-1.5">
                <div className="relative">
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    onBlur={() => {
                      if (email) validateEmail(email);
                    }}
                    placeholder="Email"
                    autoComplete="email"
                    aria-label="Email"
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                    disabled={formState === 'loading'}
                    className="h-[48px] w-full rounded-[10000px] border border-[#646261] bg-transparent px-5 text-[14px] font-normal text-white placeholder-[#959595] outline-none transition-colors duration-200 hover:border-[#959595] focus:border-[#c8a47e] disabled:opacity-50"
                    style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '15.624px' }}
                  />
                </div>
                {emailError && (
                  <p
                    id="email-error"
                    className="px-5 text-[12px] text-[#ff2f2f]"
                    style={{ fontFamily: "'Almarai', sans-serif" }}
                    role="alert"
                  >
                    {emailError}
                  </p>
                )}
              </div>

              {/* Error message */}
              {formState === 'error' && errorMessage && (
                <p
                  className="px-1 text-center text-[13px] text-[#ff2f2f]"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="flex h-[48px] w-full items-center justify-center rounded-[10000px] text-[16px] font-bold text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e] active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  fontFamily: "'Almarai', sans-serif",
                  background: 'linear-gradient(90deg, #c8a47e 0%, #a3825e 100%)',
                }}
              >
                {formState === 'loading' ? (
                  <Spinner size="sm" className="border-white border-t-transparent" />
                ) : (
                  'Send me a link'
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Right panel - image collage */}
      <div className="hidden flex-1 md:block">
        <div className="grid h-full grid-cols-2 gap-[2px]">
          <div className="grid grid-rows-[1fr_1.2fr_1fr] gap-[2px]">
            <div className="overflow-hidden bg-[#2f271f]">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80"
                alt="Person working at desk with laptop"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative overflow-hidden bg-[#2f271f]">
              <img
                src="https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?w=600&q=80"
                alt="Iced coffee on dark surface"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 px-6">
                <p
                  className="text-center text-[20px] font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}
                >
                  There&apos;s less buyer competition right now.
                </p>
                <p
                  className="mt-1 text-center text-[10px] text-white/70"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  You&apos;re not competing to other offers.
                </p>
              </div>
            </div>
            <div className="overflow-hidden bg-[#2f271f]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80"
                alt="Modern living room interior"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-rows-[1.2fr_1fr_0.8fr] gap-[2px]">
            <div className="relative overflow-hidden bg-[#2f271f]">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80"
                alt="Woman standing near doorway"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-start bg-black/20 p-6">
                <p
                  className="text-[22px] font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}
                >
                  Who You&apos;re Working
                  <br />
                  With <em>Matters.</em>
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-[#2f271f]">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80"
                alt="Cozy bedroom interior"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-end justify-start bg-black/20 p-6">
                <p
                  className="text-right text-[18px] font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}
                >
                  Everyone&apos;s waiting to buy
                  <br />
                  &quot;until the market is right...&quot;
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <p
                  className="text-right text-[10px] text-white/70"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  but here&apos;s why moving now
                  <br />
                  could be the smarter move
                </p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-[#2f271f]">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                alt="Luxury home exterior"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-end bg-black/20 p-4">
                <p
                  className="text-right text-[18px] font-medium text-white"
                  style={{ fontFamily: "'EB Garamond', serif", fontStyle: 'italic' }}
                >
                  There&apos;s less buyer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
