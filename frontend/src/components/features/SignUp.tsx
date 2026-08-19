import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../lib/api/client';
import type { SignUpResponse } from '../../types/api';
import Spinner from '../ui/Spinner';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  terms?: string;
}

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): boolean {
    const newErrors: FormErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!termsAccepted) newErrors.terms = 'You must agree to the Terms of Use and Privacy Policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');
    setErrorMessage('');

    try {
      await apiClient.post<SignUpResponse>('/api/auth/signup', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        terms_accepted: termsAccepted,
      });
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
            className="mb-1 text-center text-[28px] font-medium text-white"
            style={{ fontFamily: "'EB Garamond', serif", lineHeight: '36.54px' }}
          >
            Great Marketing Made Easier.
            <br />
            Specifically For Agents
          </h1>

          {/* Subheading */}
          <p
            className="mb-6 text-center text-[14px] font-light text-[#959595]"
            style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '22px' }}
          >
            Create your account today
          </p>

          {formState === 'success' ? (
            <div className="flex w-full flex-col items-center gap-4 rounded-[10px] border border-[#3b6c4f] bg-[#22c55e19] px-6 py-5">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
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
                Your account has been created. Please check your email to verify your account.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4" noValidate>
              {/* First Name / Last Name row */}
              <div className="flex gap-3">
                <div className="flex flex-1 flex-col gap-1.5">
                  <input
                    id="signup-first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((p) => ({ ...p, firstName: undefined }));
                    }}
                    placeholder="First Name"
                    autoComplete="given-name"
                    aria-label="First Name"
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'fn-error' : undefined}
                    disabled={formState === 'loading'}
                    className={inputClasses}
                    style={inputStyle}
                  />
                  {errors.firstName && (
                    <p id="fn-error" className="px-5 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <input
                    id="signup-last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((p) => ({ ...p, lastName: undefined }));
                    }}
                    placeholder="Last Name"
                    autoComplete="family-name"
                    aria-label="Last Name"
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'ln-error' : undefined}
                    disabled={formState === 'loading'}
                    className={inputClasses}
                    style={inputStyle}
                  />
                  {errors.lastName && (
                    <p id="ln-error" className="px-5 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <input
                  id="signup-email"
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
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  disabled={formState === 'loading'}
                  className={inputClasses}
                  style={inputStyle}
                />
                {errors.email && (
                  <p id="email-error" className="px-5 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                    }}
                    placeholder="Create a Password"
                    autoComplete="new-password"
                    aria-label="Create a Password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'pw-error' : undefined}
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
                  <p id="pw-error" className="px-5 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Terms checkbox */}
              <div className="flex flex-col gap-1.5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => {
                      setTermsAccepted(e.target.checked);
                      if (errors.terms) setErrors((p) => ({ ...p, terms: undefined }));
                    }}
                    disabled={formState === 'loading'}
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-[3px] border border-[#646261] bg-transparent transition-colors duration-200 checked:border-[#c8a47e] checked:bg-[#c8a47e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
                    aria-describedby={errors.terms ? 'terms-error' : undefined}
                  />
                  <span
                    className="text-[13px] font-normal text-[#959595]"
                    style={{ fontFamily: "'Almarai', sans-serif", lineHeight: '18px' }}
                  >
                    I have read and agree to the{' '}
                    <a href="/terms" className="text-white underline hover:text-[#c8a47e] transition-colors duration-200">
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-white underline hover:text-[#c8a47e] transition-colors duration-200">
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>
                {errors.terms && (
                  <p id="terms-error" className="px-7 text-[12px] text-[#ff2f2f]" style={{ fontFamily: "'Almarai', sans-serif" }} role="alert">
                    {errors.terms}
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
                  'Sign Up'
                )}
              </button>
            </form>
          )}

          {/* Divider + Sign in link */}
          <div className="mt-6 flex w-full flex-col items-center gap-4">
            <div className="h-px w-full bg-[#646261]" />
            <p
              className="text-[14px] font-normal text-[#959595]"
              style={{ fontFamily: "'Almarai', sans-serif" }}
            >
              Already have an account?{' '}
              <Link
                to="/"
                className="text-[#c8a47e] underline transition-colors duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c8a47e]"
              >
                Sign in
              </Link>
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
