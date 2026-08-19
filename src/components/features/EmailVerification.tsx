import BrandLogo from '@/components/brand/BrandLogo';
import EmailVerificationForm from '@/components/domain/EmailVerificationForm';
import Heading from '@/components/ui/heading';
import TextLink from '@/components/ui/link';
import { FaFacebookF, FaInstagram, FiAlertTriangle, FiMail } from '@/lib/icons';

export default function EmailVerification() {
  return (
    <div className="flex min-h-screen justify-center bg-color-16">
      <section className="flex w-full max-w-xl flex-col items-center px-6 py-12 tablet:px-10 tablet:py-16">
        <div className="flex w-full flex-col items-center bg-[radial-gradient(ellipse_at_50%_0%,var(--color-50)_0%,transparent_58%)] pb-10 text-center">
          <div className="mb-8">
            <BrandLogo />
          </div>
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent"
            aria-hidden="true"
          >
            <FiMail size={32} className="text-secondary" focusable="false" />
          </div>
          <Heading size="large" className="mb-4 leading-tight">
            Verify Your Email Address
          </Heading>
          <p className="max-w-md font-almarai text-base leading-7 text-color-18">
            You&apos;re one step away from accessing your Agentwise workspace. Click the button
            below to confirm your email.
          </p>
        </div>

        <div className="flex w-full max-w-md flex-col items-center text-center">
          <p className="mb-3 w-full text-left font-almarai text-base text-secondary">Hi,</p>
          <p className="mb-8 w-full text-left font-almarai text-base leading-7 text-color-18">
            Thanks for registering on the Agentwise portal. To activate your account and get
            started, please verify your email address by clicking the button below.
          </p>

          <EmailVerificationForm />

          <p className="mt-6 font-almarai text-sm leading-6 text-color-46">
            This verification link will expire in 24 hours. If you didn&apos;t create an account on
            Agentwise, you can safely ignore this email.
          </p>

          <div className="mt-8 flex w-full items-start gap-3 rounded-token-8 border border-color-49 px-4 py-4 text-left">
            <FiAlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden="true"
              focusable="false"
            />
            <p className="font-almarai text-sm leading-6 text-color-18">
              Never share this link with anyone. Agentwise staff will never ask you to forward this
              email. If you suspect unauthorised access, contact{' '}
              <a
                href="mailto:hello@agentwisemarketing.com"
                className="underline underline-offset-2"
              >
                hello@agentwisemarketing.com
              </a>{' '}
              immediately.
            </p>
          </div>
        </div>

        <footer className="mt-12 flex w-full max-w-md flex-col items-center border-t border-color-41 pt-8 text-center">
          <nav aria-label="Email verification links" className="font-almarai text-sm text-color-18">
            <TextLink to="/help-center" className="text-color-18" underlined={false}>
              Help Center
            </TextLink>
            <span className="mx-2 text-color-46" aria-hidden="true">
              |
            </span>
            <TextLink to="/privacy-policy" className="text-color-18" underlined={false}>
              Privacy Policy
            </TextLink>
            <span className="mx-2 text-color-46" aria-hidden="true">
              |
            </span>
            <TextLink to="/terms-of-service" className="text-color-18" underlined={false}>
              Terms of Service
            </TextLink>
          </nav>
          <p className="mt-4 font-almarai text-xs text-color-46">
            © 2026 Agentwise Inc. · All rights reserved.
          </p>
          <p className="mt-2 font-almarai text-xs text-color-46">
            You&apos;re receiving this because you registered at agentwise.io
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-color-18 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaFacebookF size={18} aria-hidden="true" focusable="false" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-color-18 hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <FaInstagram size={18} aria-hidden="true" focusable="false" />
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
