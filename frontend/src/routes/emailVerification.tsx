import { type FormEvent, useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { FiAlertTriangle, FiMail } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import Checkbox from '../components/ui/Checkbox';
import Form from '../components/ui/Form';
import IconSet from '../components/ui/IconSet';
import useEmailVerification from '../hooks/useEmailVerification';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const focusRingClass =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

const socialMediaIcons = [
  {
    href: 'https://www.facebook.com/agentwisemarketing',
    label: 'Facebook',
    icon: <FaFacebook aria-hidden="true" className="h-5 w-5" />,
  },
  {
    href: 'https://www.instagram.com/agentwisemarketing',
    label: 'Instagram',
    icon: <FaInstagram aria-hidden="true" className="h-5 w-5" />,
  },
];

function SocialMediaIcons() {
  return (
    <IconSet
      className="mt-4 flex justify-center gap-[10px]"
      icons={socialMediaIcons}
    />
  );
}

interface EmailVerificationFormProps {
  email: string;
}

export function EmailVerificationForm({
  email,
}: EmailVerificationFormProps) {
  const [acceptTerms, setAcceptTerms] = useState(false);
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

    if (!acceptTerms) {
      setValidationError(
        'You must accept the Privacy Policy and Terms of Service.',
      );
      return;
    }

    setValidationError('');
    void verifyEmail(normalizedEmail);
  };

  return (
    <Form
      className="mt-[33px] w-full text-center"
      loading={isLoading}
      onSubmit={handleSubmit}
    >
      <Checkbox
        checked={acceptTerms}
        className="mx-auto max-w-[520px] text-left"
        disabled={isLoading}
        id="accept-terms"
        onChange={(event) => {
          setAcceptTerms(event.target.checked);
          setValidationError('');
        }}
      >
        I have read and agree to the{' '}
        <Link className={`underline hover:text-white ${focusRingClass}`} to="/privacy">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link className={`underline hover:text-white ${focusRingClass}`} to="/terms">
          Terms of Service
        </Link>
        .
      </Checkbox>

      <Button
        type="submit"
        loading={isLoading}
        loadingText="Verifying…"
        aria-label="Verify email address"
        className={`mx-auto mt-5 h-[53px] w-full max-w-[230px] text-[18px] font-bold bg-accent text-color-23 hover:bg-accent-hover hover:text-white ${focusRingClass}`}
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
    </Form>
  );
}

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const firstName = searchParams.get('first_name')?.trim() || '{{first_name}}';

  return (
    <main className="min-h-screen bg-color-23 [font-family:Almarai,Arial,sans-serif] text-color-14">
      <div className="mx-auto flex min-h-screen w-full max-w-[659px] flex-col bg-color-23">
        <header className="flex h-20 shrink-0 items-center justify-center bg-color-36 px-4 md:px-0">
          <img
            src="/agentwise-logo.png"
            alt="Agentwise Real Estate Marketing"
            className="h-[46px] w-[150px] object-contain"
          />
        </header>

        <section className="flex min-h-[280px] shrink-0 flex-col items-center bg-[radial-gradient(circle_at_73%_42%,rgba(77,66,56,0.44),transparent_52%),linear-gradient(115deg,#160c15_0%,#171111_58%,#191612_100%)] px-4 py-8 text-center md:px-6 md:py-0 md:pt-[41px] lg:px-8 lg:h-[280px]">
          <span className="grid h-[62px] w-[62px] shrink-0 place-items-center rounded-full bg-accent text-white">
            <FiMail className="h-8 w-8 stroke-[1.7]" aria-hidden="true" />
          </span>
          <h1 className="mt-[18px] font-['EB_Garamond'] text-[28px] font-medium leading-[36px] text-white md:text-[32px] md:leading-[42px]">
            Verify Your Email Address
          </h1>
          <p className="mt-[20px] max-w-[620px] text-base leading-[26px] md:text-[18px] md:leading-[29px]">
            You&apos;re one step away from accessing your Agentwise workspace.
            Click the button below to confirm your email.
          </p>
        </section>

        <section className="flex flex-1 flex-col px-4 pb-8 pt-8 text-center md:px-[31px] md:pb-[41px] md:pt-[40px]">
          <p className="text-base leading-7 md:text-[18px]">Hi {firstName},</p>
          <p className="mx-auto mt-[30px] max-w-[548px] text-base leading-[26px] md:text-[18px] md:leading-[29px]">
            Thanks for registering on the Agentwise portal. To activate your
            account and get started, please verify your email address by
            clicking the button below.
          </p>

          <EmailVerificationForm email={email} />

          <p className="mx-auto mt-[21px] max-w-[555px] text-[15px] leading-[25px] md:text-[16px] md:leading-[27px]">
            This verification link will expire in 24 hours. If you didn&apos;t
            create an account on Agentwise, you can safely ignore this email.
          </p>

          <aside className="mt-[40px] flex min-h-[113px] flex-col items-start gap-4 rounded-[6px] border border-[#564332] bg-color-36 px-4 py-4 text-left text-accent md:flex-row md:items-start md:gap-[21px] md:px-[21px] md:py-[17px]">
            <FiAlertTriangle
              className="mt-[2px] h-8 w-8 shrink-0 fill-accent stroke-color-36"
              aria-hidden="true"
            />
            <p className="text-[15px] leading-[26px]">
              Never share this link with anyone. Agentwise staff will never ask
              you to forward this email. If you suspect unauthorised access,
              contact{' '}
              <a
                className={`underline underline-offset-2 ${focusRingClass}`}
                href="mailto:hello@agentwisemarketing.com"
              >
                hello@agentwisemarketing.com
              </a>{' '}
              immediately.
            </p>
          </aside>
        </section>

        <footer className="min-h-[124px] shrink-0 border-t border-[#333333] bg-color-36 px-4 pb-[21px] pt-[19px] text-center text-[14px] leading-[22px] md:px-5 md:h-[124px]">
          <nav
            aria-label="Email verification support links"
            className="flex flex-col items-center justify-center gap-3 text-color-14 sm:flex-row sm:flex-wrap sm:gap-0"
          >
            <Link
              to="/help-center"
              className={`px-5 ${focusRingClass}`}
            >
              Help Center
            </Link>
            <Link
              to="/privacy"
              className={`px-5 ${focusRingClass} sm:border-x sm:border-[#333333]`}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={`px-5 ${focusRingClass}`}
            >
              Terms of Service
            </Link>
          </nav>
          <SocialMediaIcons />
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
