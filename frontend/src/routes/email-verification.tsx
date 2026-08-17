import axios from 'axios';
import { type FormEvent, type ReactNode, useState } from 'react';
import {
  FiAlertTriangle,
  FiFacebook,
  FiInstagram,
  FiMail,
} from 'react-icons/fi';
import apiClient from '../lib/api/client';
import type { ErrorResponse } from '../types/api';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import InputField from '../components/ui/InputField';

interface VerificationResponse {
  success: boolean;
  message: string;
}

interface InformationalTextProps {
  children: ReactNode;
  className?: string;
}

export function InformationalText({
  children,
  className = '',
}: InformationalTextProps) {
  return (
    <p className={`text-base leading-7 text-[#959595] ${className}`}>
      {children}
    </p>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#333333] bg-[#1a1919] px-6 pb-5 pt-5 text-center text-sm text-[#959595]">
      <nav
        aria-label="Legal and support links"
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
      >
        <a className="transition hover:text-white" href="/help">
          Help Center
        </a>
        <span aria-hidden="true" className="h-5 border-l border-[#333333]" />
        <a className="transition hover:text-white" href="/privacy">
          Privacy Policy
        </a>
        <span aria-hidden="true" className="h-5 border-l border-[#333333]" />
        <a className="transition hover:text-white" href="/terms">
          Terms of Service
        </a>
      </nav>

      <div className="mt-4 flex justify-center gap-3">
        <a
          aria-label="Agentwise on Facebook"
          className="grid h-8 w-8 place-items-center rounded-full text-[#959595] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          href="https://www.facebook.com/"
          rel="noreferrer"
          target="_blank"
        >
          <FiFacebook aria-hidden="true" />
        </a>
        <a
          aria-label="Agentwise on Instagram"
          className="grid h-8 w-8 place-items-center rounded-full text-[#959595] transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          href="https://www.instagram.com/"
          rel="noreferrer"
          target="_blank"
        >
          <FiInstagram aria-hidden="true" />
        </a>
      </div>

      <p className="mt-3 leading-[22px]">
        © 2026 Agentwise Inc. · All rights reserved.
        <br />
        You&apos;re receiving this because you registered at agentwise.io
      </p>
    </footer>
  );
}

export function EmailVerificationForm() {
  const [email, setEmail] = useState('');
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [consentError, setConsentError] = useState('');
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    const invalidEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);
    const missingConsent = !acceptPrivacy || !acceptTerms;

    setEmailError(
      invalidEmail
        ? normalizedEmail
          ? 'Enter a valid email address.'
          : 'Email address is required.'
        : '',
    );
    setConsentError(
      missingConsent
        ? 'Please accept the Privacy Policy and Terms of Service.'
        : '',
    );
    setServerError('');
    setSuccessMessage('');

    if (invalidEmail || missingConsent) return;

    setIsSubmitting(true);
    try {
      const response = await apiClient.post<VerificationResponse>(
        '/api/email/verify',
        { email: normalizedEmail },
      );
      setSuccessMessage(
        response.data.message || 'Your email address has been verified.',
      );
    } catch (error: unknown) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        setServerError(
          error.response?.data.message ??
            'We could not verify your email address. Please try again.',
        );
      } else {
        setServerError(
          'We could not verify your email address. Please try again.',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="mx-auto mt-6 w-full max-w-[462px]"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isSubmitting}
    >
      <InputField
        id="verification-email"
        label="Email address"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        error={emailError}
        onChange={(event) => {
          setEmail(event.target.value);
          setEmailError('');
          setServerError('');
          setSuccessMessage('');
        }}
      />

      <div className="mt-4 space-y-3 text-left">
        <Checkbox
          id="accept-privacy"
          checked={acceptPrivacy}
          onChange={(event) => {
            setAcceptPrivacy(event.target.checked);
            setConsentError('');
          }}
        >
          I agree to the{' '}
          <a className="underline hover:text-white" href="/privacy">
            Privacy Policy
          </a>
          .
        </Checkbox>
        <Checkbox
          id="accept-terms"
          checked={acceptTerms}
          error={consentError}
          onChange={(event) => {
            setAcceptTerms(event.target.checked);
            setConsentError('');
          }}
        >
          I agree to the{' '}
          <a className="underline hover:text-white" href="/terms">
            Terms of Service
          </a>
          .
        </Checkbox>
      </div>

      <Button
        type="submit"
        loading={isSubmitting}
        loadingText="Verifying email…"
        className="mx-auto mt-6 max-w-[230px] bg-accent font-bold text-white hover:bg-[#d4b18d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Verify Email Address
      </Button>

      {serverError && (
        <p
          role="alert"
          className="mt-4 text-sm leading-5 text-[#e8a29d]"
        >
          {serverError}
        </p>
      )}
      {successMessage && (
        <p
          role="status"
          className="mt-4 text-sm leading-5 text-[#51ca7e]"
        >
          {successMessage}
        </p>
      )}
    </form>
  );
}

export default function EmailVerification() {
  return (
    <main className="min-h-screen bg-[#0e0d0d] font-['Almarai'] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[658px] flex-col bg-[#0b0b0b]">
        <header className="grid h-20 shrink-0 place-items-center bg-[#1a1919]">
          <img
            src="/agentwise-logo.png"
            alt="Agentwise Real Estate Marketing"
            className="h-[52px] w-[172px] object-contain"
          />
        </header>

        <section className="bg-[radial-gradient(circle_at_85%_40%,rgba(85,72,60,0.35),transparent_55%),linear-gradient(110deg,#120913_0%,#1a1015_46%,#171613_100%)] px-6 py-10 text-center sm:px-8">
          <span className="mx-auto grid h-[62px] w-[62px] place-items-center rounded-full bg-accent text-white">
            <FiMail className="h-8 w-8" aria-hidden="true" />
          </span>
          <h1 className="mt-5 font-['EB_Garamond'] text-[32px] font-medium leading-[42px]">
            Verify Your Email Address
          </h1>
          <p className="mx-auto mt-5 max-w-[590px] text-lg leading-[29px] text-[#959595]">
            You&apos;re one step away from accessing your Agentwise workspace.
            Click the button below to confirm your email.
          </p>
        </section>

        <section className="flex-1 px-6 py-10 text-center sm:px-[62px]">
          <InformationalText>Hi there,</InformationalText>
          <InformationalText className="mt-7">
            Thanks for registering on the Agentwise portal. To activate your
            account and get started, please verify your email address.
          </InformationalText>

          <EmailVerificationForm />

          <InformationalText className="mx-auto mt-6 max-w-[550px] text-sm leading-6">
            This verification link will expire in 24 hours. If you didn&apos;t
            create an account on Agentwise, you can safely ignore this email.
          </InformationalText>

          <div className="mt-8 flex gap-5 rounded-md border border-[#473e33] bg-[#1a1919] px-5 py-4 text-left text-sm leading-[26px] text-[#c8a47e]">
            <FiAlertTriangle
              className="mt-0.5 h-7 w-7 shrink-0 fill-[#c8a47e] text-[#c8a47e]"
              aria-hidden="true"
            />
            <p>
              Never share this link with anyone. Agentwise staff will never ask
              you to forward this email. If you suspect unauthorised access,
              contact{' '}
              <a
                className="underline underline-offset-2 hover:text-white"
                href="mailto:hello@agentwisemarketing.com"
              >
                hello@agentwisemarketing.com
              </a>{' '}
              immediately.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
