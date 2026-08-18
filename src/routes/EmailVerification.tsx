import { ErrorMessage, LoadingIndicator } from '../components/auth/FormControls'
import { useEmailVerification } from '../hooks/useEmailVerification'

function AgentwiseLogo() {
  return (
    <div
      className="text-center text-white"
      aria-label="Agentwise Real Estate Marketing"
    >
      <div className="font-display text-[38px] italic leading-7 tracking-[-0.045em]">
        Agentwise
      </div>
      <div className="mt-1 text-[4px] font-bold uppercase tracking-[0.28em]">
        Real Estate Marketing
      </div>
    </div>
  )
}

function EnvelopeIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="26" height="19" rx="4" fill="white" />
      <path
        d="m5 10 10.1 6.4a1.7 1.7 0 0 0 1.8 0L27 10"
        stroke="#D2AA80"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.2 5.5a3.2 3.2 0 0 1 5.6 0l10 18A3 3 0 0 1 26.2 28H5.8a3 3 0 0 1-2.6-4.5l10-18Z"
        fill="#D2AA80"
      />
      <path
        d="M16 11v7M16 23v.2"
        stroke="#222"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function EmailVerification() {
  const { error, isLoading, successMessage, verifyEmail } =
    useEmailVerification()

  return (
    <main className="min-h-screen bg-[#0b0b0b] font-body text-[#999799]">
      <div className="mx-auto min-h-screen w-full max-w-[658px] bg-[#0b0b0b]">
        <header className="flex h-20 items-center justify-center bg-[#181818]">
          <AgentwiseLogo />
        </header>

        <section className="flex min-h-[280px] flex-col items-center bg-[radial-gradient(circle_at_51%_36%,rgba(107,83,66,0.39),transparent_48%),linear-gradient(112deg,#140c15_0%,#1d1317_52%,#1d1916_100%)] px-5 pb-10 pt-[41px] text-center sm:h-[280px] sm:px-6 sm:pb-0">
          <div className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#d2aa80]">
            <EnvelopeIcon />
          </div>
          <h1 className="mt-[18px] font-display text-[32px] font-medium leading-[42px] text-white">
            Verify Your Email Address
          </h1>
          <p className="mt-[20px] max-w-[590px] text-[17px] leading-[29px]">
            You&apos;re one step away from accessing your Agentwise workspace.
            Click the button below to confirm your email.
          </p>
        </section>

        <section className="px-[30px] pb-[41px] pt-[40px] text-center sm:px-[31px]">
          <p className="text-[18px] leading-7">Hi {'{{first_name}}'},</p>
          <p className="mx-auto mt-[28px] max-w-[550px] text-[17px] leading-[29px]">
            Thanks for registering on the Agentwise portal. To activate your
            account and get started, please verify your email address by
            clicking the button below.
          </p>

          <button
            type="button"
            onClick={() => void verifyEmail()}
            disabled={isLoading || Boolean(successMessage)}
            className="mt-[31px] inline-flex min-h-[53px] min-w-[230px] items-center justify-center rounded-full bg-[#d2aa80] px-7 text-[17px] font-bold text-white transition hover:bg-[#dfb98f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d2aa80] disabled:cursor-not-allowed disabled:opacity-75"
            aria-label="Verify email address"
          >
            {isLoading ? (
              <LoadingIndicator label="Verifying…" />
            ) : successMessage ? (
              'Email Verified'
            ) : (
              'Verify Email Address'
            )}
          </button>

          <div className="mx-auto mt-[23px] min-h-[48px] max-w-[550px]">
            {error ? <ErrorMessage>{error}</ErrorMessage> : null}
            {successMessage ? (
              <p
                className="text-sm leading-6 text-[#d2aa80]"
                role="status"
                aria-live="polite"
              >
                {successMessage}
              </p>
            ) : null}
            {!error && !successMessage ? (
              <p className="text-[15px] leading-[27px]">
                This verification link will expire in 24 hours. If you
                didn&apos;t create an account on Agentwise, you can safely
                ignore this email.
              </p>
            ) : null}
          </div>

          <aside className="mt-[38px] flex min-h-[113px] items-start gap-5 rounded-[5px] border border-[#443b34] bg-[#181818] px-5 py-[17px] text-left text-[15px] leading-[26px] text-[#c39b70]">
            <WarningIcon />
            <p>
              Never share this link with anyone. Agentwise staff will never ask
              you to forward this email. If you suspect unauthorised access,
              contact{' '}
              <a
                href="mailto:hello@agentwisemarketing.com"
                className="underline underline-offset-2 hover:text-[#d9b58e] focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d2aa80]"
              >
                hello@agentwisemarketing.com
              </a>{' '}
              immediately.
            </p>
          </aside>
        </section>

        <footer className="border-t-2 border-[#282828] bg-[#181818] px-6 pb-5 pt-[18px] text-center text-[13px] leading-[22px]">
          <nav
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
            aria-label="Legal"
          >
            <a
              className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d2aa80]"
              href="/help"
            >
              Help Center
            </a>
            <span className="text-[#333]" aria-hidden="true">
              |
            </span>
            <a
              className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d2aa80]"
              href="/privacy-policy"
            >
              Privacy Policy
            </a>
            <span className="text-[#333]" aria-hidden="true">
              |
            </span>
            <a
              className="hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d2aa80]"
              href="/terms-of-service"
            >
              Terms of Service
            </a>
          </nav>
          <p className="mt-[17px]">© 2026 Agentwise Inc. · All rights reserved.</p>
          <p>You&apos;re receiving this because you registered at agentwise.io</p>
        </footer>
      </div>
    </main>
  )
}
