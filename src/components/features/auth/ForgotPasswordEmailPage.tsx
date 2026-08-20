import { FormEvent, useState } from 'react';
import { FiAlertTriangle, FiLock } from 'react-icons/fi';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import AgentLogo from '../../brand/AgentLogo';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import ContractGapBanner from '../../ui/ContractGapBanner';
import Input from '../../ui/Input';
import { useForgotPasswordEmail } from '../../../hooks/useForgotPasswordEmail';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordEmailPage = () => {
  const { submit, isLoading, showGapBanner, fieldErrors } =
    useForgotPasswordEmail();
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailPattern.test(email))
      errors.email = 'Enter a valid email address';
    if (!privacyAccepted) errors.privacy = 'You must accept the Privacy Policy';
    if (!termsAccepted) errors.terms = 'You must accept the Terms of Service';

    setClientErrors(errors);
    if (Object.keys(errors).length > 0) return;

    await submit({
      email: email.trim(),
      privacy_accepted: privacyAccepted,
      terms_accepted: termsAccepted,
    });
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111] px-6 py-10 text-white sm:px-10">
      <AgentLogo className="mb-8" />

      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/30">
        <FiLock className="text-2xl text-white" aria-hidden="true" />
      </div>

      <h1 className="text-center font-garamond text-2xl font-medium">
        Reset Your Password
      </h1>
      <p className="mt-3 text-center font-almarai text-sm leading-relaxed text-color-57">
        Enter the email address associated with your Agentwise account. We will
        send you a link to choose a new password.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
        {showGapBanner ? (
          <ContractGapBanner message="Password reset endpoint not available" />
        ) : null}

        <Input
          name="email"
          type="email"
          autoComplete="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={clientErrors.email ?? fieldErrors.email}
          disabled={isLoading}
          dark
        />

        <Checkbox
          id="forgot-privacy-policy"
          checked={privacyAccepted}
          onChange={setPrivacyAccepted}
          error={clientErrors.privacy}
          label={
            <>
              I accept the{' '}
              <a href="#" className="underline">
                Privacy Policy
              </a>
            </>
          }
        />

        <Checkbox
          id="forgot-terms-service"
          checked={termsAccepted}
          onChange={setTermsAccepted}
          error={clientErrors.terms}
          label={
            <>
              I accept the{' '}
              <a href="#" className="underline">
                Terms of Service
              </a>
            </>
          }
        />

        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Send Reset Link'}
        </Button>
      </form>

      <div className="mt-6 flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4 font-almarai text-xs leading-relaxed text-accent">
        <FiAlertTriangle className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>
          If you did not request a password reset, your account may be at risk.
          Secure it immediately by contacting{' '}
          <a href="mailto:hello@agentwisemarketing.com" className="underline">
            hello@agentwisemarketing.com
          </a>{' '}
          or changing your password from the portal.
        </p>
      </div>

      <footer className="mt-10 border-t border-white/10 pt-6 text-center font-almarai text-xs leading-[18px] text-color-57">
        <nav
          className="mb-4 flex flex-wrap justify-center gap-4"
          aria-label="Footer"
        >
          <a href="#" className="hover:text-white">
            Help Center
          </a>
          <span aria-hidden="true">|</span>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <span aria-hidden="true">|</span>
          <a href="#" className="hover:text-white">
            Terms of Service
          </a>
        </nav>
        <p>© 2026 Agentwise Inc. · All rights reserved.</p>
        <p className="mt-1">
          You&apos;re receiving this because you registered at agentwise.io
        </p>
        <div className="mt-4 flex justify-center gap-4 text-lg">
          <a href="#" aria-label="Facebook">
            <SiFacebook />
          </a>
          <a href="#" aria-label="Instagram">
            <SiInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default ForgotPasswordEmailPage;
