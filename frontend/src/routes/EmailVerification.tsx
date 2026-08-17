import { type FormEvent, useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import InputField from '../components/ui/InputField';
import Spinner from '../components/ui/Spinner';
import useEmailVerification from '../hooks/useEmailVerification';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const focusStyles =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

interface EmailVerificationFormProps {
  initialEmail: string;
}

export function EmailVerificationForm({
  initialEmail,
}: EmailVerificationFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(initialEmail);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [consentError, setConsentError] = useState('');
  const { error, loading, success, verifyEmail } = useEmailVerification();

  useEffect(() => {
    if (success) {
      navigate('/signin?verified=true', { replace: true });
    }
  }, [navigate, success]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();
    let isValid = true;

    if (!normalizedEmail) {
      setEmailError('Email address is required.');
      isValid = false;
    } else if (!emailPattern.test(normalizedEmail)) {
      setEmailError('Enter a valid email address.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!privacyAccepted || !termsAccepted) {
      setConsentError(
        'Please accept the Privacy Policy and Terms of Service.',
      );
      isValid = false;
    } else {
      setConsentError('');
    }

    if (isValid) {
      await verifyEmail(normalizedEmail);
    }
  };

  return (
    <form
      className="mx-auto mt-7 w-full max-w-[462px] text-left"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={loading}
    >
      <InputField
        id="verification-email"
        label="Verify Email Address"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        error={emailError}
        disabled={loading}
        onChange={(event) => {
          setEmail(event.target.value);
          setEmailError('');
        }}
      />

      <div className="mt-4 space-y-3">
        <Checkbox
          id="accept-privacy"
          checked={privacyAccepted}
          disabled={loading}
          onChange={(event) => {
            setPrivacyAccepted(event.target.checked);
            setConsentError('');
          }}
        >
          I agree to the{' '}
          <Link
            className={`text-accent underline underline-offset-2 hover:text-white ${focusStyles}`}
            to="/privacy"
          >
            Privacy Policy
          </Link>
          .
        </Checkbox>
        <Checkbox
          id="accept-terms"
          checked={termsAccepted}
          disabled={loading}
          onChange={(event) => {
            setTermsAccepted(event.target.checked);
            setConsentError('');
          }}
        >
          I agree to the{' '}
          <Link
            className={`text-accent underline underline-offset-2 hover:text-white ${focusStyles}`}
            to="/terms"
          >
            Terms of Service
          </Link>
          .
        </Checkbox>
      </div>

      {consentError && (
        <p className="mt-3 text-xs leading-5 text-color-73" role="alert">
          {consentError}
        </p>
      )}

      <div className="mx-auto mt-5 w-full max-w-[230px]">
        {loading ? (
          <div
            className="flex h-[53px] w-full items-center justify-center rounded-full bg-accent"
            aria-label="Verifying email address"
          >
            <Spinner label="Verifying email address" />
          </div>
        ) : (
          <Button
            type="submit"
            aria-label="Verify email address"
            className={`h-[53px] text-[18px] font-bold bg-accent text-color-23 hover:bg-accent-hover hover:text-white ${focusStyles}`}
          >
            Verify Email Address
          </Button>
        )}
      </div>

      {error && (
        <p
          className="mt-4 text-center text-sm leading-5 text-color-73"
          role="alert"
        >
          {error}
        </p>
      )}
      {success && (
        <p className="sr-only" role="status">
          Email verified successfully. Redirecting to sign in.
        </p>
      )}
    </form>
  );
}

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') ?? '';
  const firstName = searchParams.get('first_name')?.trim() || '{{first_name}}';

  return (
    <main className="min-h-screen bg-color-23 [font-family:Almarai,Arial,sans-serif] text-color-14">
      <div className="mx-auto flex min-h-screen w-full max-w-[659px] flex-col bg-color-23">
        <header className="flex h-20 shrink-0 items-center justify-center bg-color-36 px-4">
          <img
            src="/agentwise-logo.png"
            alt="Agentwise Real Estate Marketing"
            className="h-[46px] w-[150px] object-contain"
          />
        </header>

        <section className="flex min-h-[280px] shrink-0 flex-col items-center bg-[radial-gradient(circle_at_73%_42%,rgba(77,66,56,0.44),transparent_52%),linear-gradient(115deg,#160c15_0%,#171111_58%,#191612_100%)] px-4 py-8 text-center md:px-6 md:pb-0 md:pt-[41px]">
          <span className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-accent text-white">
            <FiMail className="h-8 w-8 stroke-[1.7]" aria-hidden="true" />
          </span>
          <h1 className="mt-[18px] font-['EB_Garamond'] text-[28px] font-medium leading-[36px] text-white md:text-[32px] md:leading-[42px]">
            Verify Your Email Address
          </h1>
          <p className="mt-5 max-w-[620px] text-base leading-[26px] md:text-[18px] md:leading-[29px]">
            You&apos;re one step away from accessing your Agentwise workspace.
            Click the button below to confirm your email.
          </p>
        </section>

        <section className="flex flex-1 flex-col px-4 pb-8 pt-8 text-center md:px-[31px] md:pb-[41px] md:pt-10">
          <p className="text-base leading-7 md:text-[18px]">Hi {firstName},</p>
          <p className="mx-auto mt-[30px] max-w-[548px] text-base leading-[26px] md:text-[18px] md:leading-[29px]">
            Thanks for registering on the Agentwise portal. To activate your
            account and get started, please verify your email address below.
          </p>

          <EmailVerificationForm initialEmail={initialEmail} />

          <p className="mx-auto mt-[21px] max-w-[555px] text-[15px] leading-[25px] md:text-base md:leading-[27px]">
            This verification link will expire in 24 hours. If you didn&apos;t
            create an account on Agentwise, you can safely ignore this email.
          </p>

          <aside className="mt-10 flex min-h-[113px] flex-col items-start gap-4 rounded-[6px] border border-[#564332] bg-color-36 px-4 py-4 text-left text-accent md:flex-row md:gap-[21px] md:px-[21px] md:py-[17px]">
            <FiAlertTriangle
              className="mt-0.5 h-8 w-8 shrink-0 fill-accent stroke-color-36"
              aria-hidden="true"
            />
            <p className="text-[15px] leading-[26px]">
              Never share this link with anyone. Agentwise staff will never ask
              you to forward this email. If you suspect unauthorised access,
              contact{' '}
              <a
                className={`underline underline-offset-2 ${focusStyles}`}
                href="mailto:hello@agentwisemarketing.com"
              >
                hello@agentwisemarketing.com
              </a>{' '}
              immediately.
            </p>
          </aside>
        </section>

        <footer className="shrink-0 border-t border-color-19 bg-color-36 px-4 pb-[21px] pt-[19px] text-center text-[14px] leading-[22px]">
          <nav
            aria-label="Email verification support links"
            className="flex flex-wrap items-center justify-center text-color-14"
          >
            <Link className={`px-5 ${focusStyles}`} to="/help-center">
              Help Center
            </Link>
            <Link
              className={`border-x border-color-19 px-5 ${focusStyles}`}
              to="/privacy"
            >
              Privacy Policy
            </Link>
            <Link className={`px-5 ${focusStyles}`} to="/terms">
              Terms of Service
            </Link>
          </nav>

          <div
            className="mt-3 flex justify-center gap-2"
            aria-label="Agentwise social media"
          >
            <a
              className={`grid h-8 w-8 place-items-center rounded-full text-color-14 hover:text-white ${focusStyles}`}
              href="https://www.facebook.com/agentwisemarketing"
              target="_blank"
              rel="noreferrer"
              aria-label="Agentwise on Facebook"
            >
              <FaFacebookF aria-hidden="true" />
            </a>
            <a
              className={`grid h-8 w-8 place-items-center rounded-full text-color-14 hover:text-white ${focusStyles}`}
              href="https://www.instagram.com/agentwisemarketing"
              target="_blank"
              rel="noreferrer"
              aria-label="Agentwise on Instagram"
            >
              <FaInstagram aria-hidden="true" />
            </a>
          </div>

          <p className="mt-3">
            © 2026 Agentwise Inc. · All rights reserved.
            <br />
            You&apos;re receiving this because you registered at agentwise.io
          </p>
        </footer>
      </div>
    </main>
  );
}
