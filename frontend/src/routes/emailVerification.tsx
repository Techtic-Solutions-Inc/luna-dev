import { type FormEvent, useState } from 'react';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import useEmailVerification from '../hooks/useEmailVerification';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface EmailVerificationFormProps {
  email: string;
}

export function EmailVerificationForm({
  email,
}: EmailVerificationFormProps) {
  const [validationError, setValidationError] = useState('');
  const { error, isLoading, isSuccess, verifyEmail } =
    useEmailVerification();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setValidationError(
        'This verification link is missing an email address. Please request a new link.',
      );
      return;
    }

    if (!emailPattern.test(normalizedEmail)) {
      setValidationError(
        'This verification link contains an invalid email address. Please request a new link.',
      );
      return;
    }

    setValidationError('');
    void verifyEmail(normalizedEmail);
  };

  return (
    <form
      className="mt-[33px] text-center"
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isLoading}
    >
      <Button
        type="submit"
        loading={isLoading}
        loadingText="Verifying…"
        aria-label="Verify email address"
        className="mx-auto h-[53px] w-full max-w-[230px] bg-accent text-[18px] font-bold text-white hover:bg-[#d3b18d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        Verify Email Address
      </Button>

      {(validationError || error) && (
        <p
          className="mx-auto mt-4 max-w-[520px] text-sm leading-5 text-[#e8a29d]"
          role="alert"
        >
          {validationError || error}
        </p>
      )}

      {isSuccess && (
        <p
          className="mx-auto mt-4 max-w-[520px] text-sm leading-5 text-[#51ca7e]"
          role="status"
        >
          Your email address has been verified successfully.
        </p>
      )}
    </form>
  );
}

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const firstName = searchParams.get('first_name')?.trim() || '{{first_name}}';

  return (
    <main className="min-h-screen bg-[#0b0b0b] [font-family:Almarai,Arial,sans-serif] text-[#959595]">
      <div className="mx-auto flex min-h-screen w-full max-w-[659px] flex-col bg-[#0b0b0b]">
        <header className="flex h-20 shrink-0 items-center justify-center bg-[#1a1919]">
          <img
            src="/agentwise-logo.png"
            alt="Agentwise Real Estate Marketing"
            className="h-[46px] w-[150px] object-contain"
          />
        </header>

        <section className="flex min-h-[280px] shrink-0 flex-col items-center bg-[radial-gradient(circle_at_73%_42%,rgba(77,66,56,0.44),transparent_52%),linear-gradient(115deg,#160c15_0%,#171111_58%,#191612_100%)] px-5 py-8 text-center sm:h-[280px] sm:px-6 sm:py-0 sm:pt-[41px]">
          <span className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-accent text-white">
            <FiMail className="h-8 w-8 stroke-[1.7]" aria-hidden="true" />
          </span>
          <h1 className="mt-[18px] font-['EB_Garamond'] text-[32px] font-medium leading-[42px] text-white">
            Verify Your Email Address
          </h1>
          <p className="mt-[20px] max-w-[620px] text-[18px] leading-[29px]">
            You&apos;re one step away from accessing your Agentwise workspace.
            Click the button below to confirm your email.
          </p>
        </section>

        <section className="flex-1 px-5 pb-[41px] pt-[40px] text-center sm:px-[31px]">
          <p className="text-[18px] leading-7">Hi {firstName},</p>
          <p className="mx-auto mt-[30px] max-w-[548px] text-[18px] leading-[29px]">
            Thanks for registering on the Agentwise portal. To activate your
            account and get started, please verify your email address by
            clicking the button below.
          </p>

          <EmailVerificationForm email={email} />

          <p className="mx-auto mt-[21px] max-w-[555px] text-[16px] leading-[27px]">
            This verification link will expire in 24 hours. If you didn&apos;t
            create an account on Agentwise, you can safely ignore this email.
          </p>

          <aside className="mt-[40px] flex min-h-[113px] items-start gap-[21px] rounded-[6px] border border-[#564332] bg-[#1a1919] px-[21px] py-[17px] text-left text-[#c8a47e]">
            <FiAlertTriangle
              className="mt-[2px] h-8 w-8 shrink-0 fill-[#c8a47e] stroke-[#1a1919]"
              aria-hidden="true"
            />
            <p className="text-[15px] leading-[26px]">
              Never share this link with anyone. Agentwise staff will never ask
              you to forward this email. If you suspect unauthorised access,
              contact{' '}
              <a
                className="underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                href="mailto:hello@agentwisemarketing.com"
              >
                hello@agentwisemarketing.com
              </a>{' '}
              immediately.
            </p>
          </aside>
        </section>

        <footer className="min-h-[124px] shrink-0 border-t border-[#333333] bg-[#1a1919] px-5 pb-[21px] pt-[19px] text-center text-[14px] leading-[22px] sm:h-[124px]">
          <nav
            aria-label="Email verification support links"
            className="flex flex-wrap items-center justify-center text-[#959595]"
          >
            <Link
              to="/help-center"
              className="px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              Help Center
            </Link>
            <Link
              to="/privacy"
              className="border-x border-[#333333] px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="px-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
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
