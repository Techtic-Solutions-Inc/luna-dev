import { FormEvent, useState } from 'react';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { SiFacebook, SiInstagram } from 'react-icons/si';
import AgentLogo from '../../brand/AgentLogo';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import ContractGapBanner from '../../ui/ContractGapBanner';
import FormErrorBanner from '../../ui/FormErrorBanner';
import Input from '../../ui/Input';
import { useEmailVerification } from '../../../hooks/useEmailVerification';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailVerificationPage = () => {
  const { submit, showGapBanner, bannerError, fieldErrors, resetErrors } =
    useEmailVerification();
  const [email, setEmail] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const clearClientError = (field: string) => {
    resetErrors();
    if (clientErrors[field]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors: Record<string, string> = {};

    if (!email.trim()) errors.email = 'Email is required';
    else if (!emailPattern.test(email.trim()))
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
    <div className="overflow-hidden rounded-2xl border border-white/10 text-white">
      <div className="bg-black px-6 py-8 text-center sm:px-10">
        <AgentLogo />
      </div>

      <div className="email-hero-gradient px-6 py-8 text-center sm:px-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent">
          <FiMail className="text-2xl text-white" aria-hidden="true" />
        </div>

        <h1 className="font-garamond text-[1.75rem] font-semibold leading-[31.32px] sm:text-[2rem]">
          Verify Your Email Address
        </h1>
        <p className="mx-auto mt-3 max-w-md font-public text-sm leading-relaxed text-color-57">
          You&apos;re one step away from accessing your Agentwise workspace.
          Enter your email below to request a verification link.
        </p>
      </div>

      <div className="bg-black px-6 py-8 sm:px-10">
        <p className="font-almarai text-sm text-color-93">Hi there,</p>
        <p className="mt-3 font-almarai text-sm leading-relaxed text-color-57">
          Thanks for registering on the Agentwise portal. To activate your
          account and get started, please verify your email address using the
          form below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
          {bannerError ? <FormErrorBanner message={bannerError} /> : null}
          {showGapBanner ? (
            <ContractGapBanner message="Email verification endpoint not available" />
          ) : null}

          <Input
            name="email"
            type="email"
            autoComplete="email"
            label="Verify Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearClientError('email');
            }}
            error={clientErrors.email ?? fieldErrors.email}
            dark
          />

          <Checkbox
            id="verify-privacy-policy"
            checked={privacyAccepted}
            onChange={(checked) => {
              setPrivacyAccepted(checked);
              clearClientError('privacy');
            }}
            error={clientErrors.privacy}
            label={<>I accept the Privacy Policy</>}
          />

          <Checkbox
            id="verify-terms-service"
            checked={termsAccepted}
            onChange={(checked) => {
              setTermsAccepted(checked);
              clearClientError('terms');
            }}
            error={clientErrors.terms}
            label={<>I accept the Terms of Service</>}
          />

          <Button type="submit">Verify Email Address</Button>
        </form>

        <p className="mt-4 text-center font-almarai text-xs leading-relaxed text-color-57">
          This verification link will expire in 24 hours. If you didn&apos;t
          create an account on Agentwise, you can safely ignore this email.
        </p>

        <div className="mt-6 flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4 font-almarai text-xs leading-relaxed text-accent">
          <FiAlertTriangle
            className="mt-0.5 shrink-0 text-accent"
            aria-hidden="true"
          />
          <p>
            Never share this link with anyone. Agentwise staff will never ask
            you to forward this email. If you suspect unauthorised access,
            contact{' '}
            <a
              href="mailto:hello@agentwisemarketing.com"
              className="underline hover:text-white"
            >
              hello@agentwisemarketing.com
            </a>{' '}
            immediately.
          </p>
        </div>

        <footer className="mt-10 border-t border-white/10 pt-6 text-center font-almarai text-xs leading-[18px] text-text-secondary">
          <nav
            className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            aria-label="Footer"
          >
            <span className="text-color-57">Help Center</span>
            <span className="text-color-57" aria-hidden="true">
              |
            </span>
            <span className="text-color-57">Privacy Policy</span>
            <span className="text-color-57" aria-hidden="true">
              |
            </span>
            <span className="text-color-57">Terms of Service</span>
          </nav>
          <p className="text-color-57">
            © 2024 Agentwise Inc. · All rights reserved.
          </p>
          <p className="mt-1 text-color-57">
            You&apos;re receiving this because you registered at agentwise.io
          </p>
          <div className="mt-4 flex justify-center gap-4 text-lg text-color-57">
            <span aria-label="Facebook (unavailable)" className="opacity-60">
              <SiFacebook aria-hidden="true" />
            </span>
            <span aria-label="Instagram (unavailable)" className="opacity-60">
              <SiInstagram aria-hidden="true" />
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
