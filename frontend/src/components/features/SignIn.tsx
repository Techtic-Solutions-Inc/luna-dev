import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../lib/api/client';
import type { LoginResponse } from '../../types/api';
import Spinner from '../ui/Spinner';

type FormState = 'idle' | 'loading' | 'error';

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');
    setErrorMessage('');

    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        email,
        password,
      });
      const { token } = response.data.data;
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
        localStorage.setItem('token', token);
      }
      navigate('/');
    } catch (err: unknown) {
      setFormState('error');
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMessage(err.response.data.message as string);
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    }
  }

  const inputClasses =
    'h-[48px] w-full rounded-[10000px] border border-[#646261] bg-transparent px-5 text-[14px] font-normal text-white placeholder-[#959595] outline-none transition-colors duration-200 hover:border-[#959595] focus:border-[#c8a47e] disabled:opacity-50';
  const inputStyle = { fontFamily: "'Almarai', sans-serif", lineHeight: '15.624px' };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-12 md:w-[480px] md:min-w-[480px] md:px-16">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #1a1a19 0%, #2f271f 50%, #1a1a19 100%)',
          }}
        />

        <div className="relative z-10 flex w-full max-w-[340px] flex-col items-center">
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center">
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
            className="mb-2 text-center text-[28px] font-medium text-white"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '36.54px' }}
          >
            Welcome To Agentwise
          </h1>

          {/* Subtitle */}
          <p
            className="mb-6 text-[14px] font-light text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
          >
            Everything you need to create standout real estate content.
          </p>

          <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="Email"
                autoComplete="email"
                aria-label="Email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'signin-email-error' : undefined}
                disabled={formState === 'loading'}
                className={inputClasses}
                style={inputStyle}
              />
              {errors.email && (
                <p id="signin-email-error" className="px-5 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  placeholder="Password"
                  autoComplete="current-password"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'signin-pw-error' : undefined}
                  disabled={formState === 'loading'}
                  className={`${inputClasses} pr-12`}
                  style={inputStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#959595] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="signin-pw-error" className="px-5 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={formState === 'loading'}
                  className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-[#646261] bg-transparent transition-colors duration-200 checked:border-[#c8a47e] checked:bg-[#c8a47e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                />
                <span
                  className="text-[13px] font-normal text-[#959595]"
                  style={{ fontFamily: "'Almarai', sans-serif" }}
                >
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-[13px] font-normal text-[#959595] transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                style={{ fontFamily: "'Almarai', sans-serif" }}
              >
                Forgot your password?
              </Link>
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

            {/* Submit */}
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
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 flex w-full flex-col items-center gap-4">
            <div className="h-px w-full bg-[#646261]" />
            <p
              className="text-[14px] font-normal text-[#959595]"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Not a member yet?{' '}
              <Link
                to="/sign-up"
                className="text-[#c8a47e] underline transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
              >
                Sign up here
              </Link>
              .
            </p>
          </div>
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
