import { type FormEvent, useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
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
  const [validationError, setValidationError] = useState('');
  const { error, loading, success, verifyEmail } = useEmailVerification();

  useEffect(() => {
    if (success) {
      navigate('/signin?verified=true', { replace: true });
    }
  }, [navigate, success]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = initialEmail.trim();

    if (!emailPattern.test(normalizedEmail)) {
      setValidationError(
        'This verification link is invalid or incomplete. Please use the link from your verification email.',
      );
      return;
    }

    setValidationError('');
    await verifyEmail(normalizedEmail);
  };

  return (
    <form
      className="mx-auto mt-[33px] w-full max-w-[230px]"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={loading}
    >
      <div className="flex h-[53px] w-full justify-center">
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
            className={`h-[53px] bg-accent text-[18px] font-bold text-white hover:bg-accent-hover ${focusStyles}`}
          >
            Verify Email Address
          </Button>
        )}
      </div>

      {(validationError || error) && (
        <p
          className="relative left-1/2 mt-3 w-[min(90vw,430px)] -translate-x-1/2 text-center text-sm leading-5 text-color-73"
          role="alert"
        >
          {validationError || error}
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

        <section className="flex min-h-[280px] shrink-0 flex-col items-center bg-[radial-gradient(circle_at_73%_42%,rgba(77,66,56,0.44),transparent_52%),linear-gradient(115deg,#160c15_0%,#171111_58%,#191612_100%)] px-4 py-8 text-center sm:px-6 sm:pb-0 sm:pt-[41px]">
          <span className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-accent text-white">
            <svg
              viewBox="0 0 32 32"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <rect
                x="1"
                y="5"
                width="30"
                height="23"
                rx="3.5"
                className="fill-white"
              />
              <path
                d="m3 8 13 8 13-8"
                className="fill-none stroke-accent stroke-[2]"
              />
            </svg>
          </span>
          <h1 className="mt-[18px] font-['EB_Garamond'] text-[28px] font-medium leading-[36px] text-white sm:text-[32px] sm:leading-[42px]">
            Verify Your Email Address
          </h1>
          <p className="mt-5 max-w-[620px] text-base leading-[26px] sm:text-[18px] sm:leading-[29px]">
            You&apos;re one step away from accessing your Agentwise workspace.
            Click the button below to confirm your email.
          </p>
        </section>

        <section className="flex flex-1 flex-col px-4 pb-8 pt-8 text-center sm:px-[31px] sm:pb-[41px] sm:pt-10">
          <p className="text-base leading-7 sm:text-[18px]">Hi {firstName},</p>
          <p className="mx-auto mt-[30px] max-w-[538px] text-base leading-[26px] sm:text-[18px] sm:leading-[29px]">
            Thanks for registering on the Agentwise portal. To activate your
            account and get started, please verify your email address by
            clicking the button below.
          </p>

          <EmailVerificationForm initialEmail={initialEmail} />

          <p className="mx-auto mt-[21px] max-w-[555px] text-[15px] leading-[25px] sm:text-base sm:leading-[27px]">
            This verification link will expire in 24 hours. If you didn&apos;t
            create an account on Agentwise, you can safely ignore this email.
          </p>

          <aside className="mt-10 flex min-h-[113px] flex-col items-start gap-4 rounded-[6px] border border-color-56 bg-color-36 px-4 py-4 text-left text-accent sm:flex-row sm:gap-[21px] sm:px-[21px] sm:py-[17px]">
            <FiAlertTriangle
              className="mt-0.5 h-8 w-8 shrink-0 fill-accent stroke-color-36"
              aria-hidden="true"
            />
            <p className="text-[15px] leading-[26px] sm:pr-5">
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

          <p className="mt-[19px]">
            © 2026 Agentwise Inc. · All rights reserved.
            <br />
            You&apos;re receiving this because you registered at agentwise.io
          </p>
        </footer>
      </div>
    </main>
  );
}
