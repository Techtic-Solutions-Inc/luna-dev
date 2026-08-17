import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm'

export default function ForgotPassword() {
  return (
    <main className="flex min-h-screen overflow-hidden bg-[#090909] font-body text-white">
      <section className="relative flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_79%_39%,rgba(94,75,59,0.55),transparent_39%),radial-gradient(circle_at_3%_105%,rgba(1,41,27,0.43),transparent_42%),linear-gradient(135deg,#0a0a0a_14%,#150b14_54%,#090b09_100%)] px-6 py-14 sm:px-10 lg:w-[54.1667%] lg:px-12">
        <div className="mx-auto w-full max-w-[462px]">
          <div
            className="mx-auto w-[172px] text-center text-white"
            aria-label="Agentwise Real Estate Marketing"
          >
            <div className="font-display text-[46px] italic leading-9 tracking-[-0.04em]">
              Agentwise
            </div>
            <div className="mt-1 text-center text-[5px] font-bold uppercase tracking-[0.28em]">
              Real Estate Marketing
            </div>
          </div>

          <div className="mt-[38px] text-center">
            <h1 className="font-display text-[38px] font-medium leading-[48px]">
              Reset Password
            </h1>
            <p className="mx-auto mt-7 max-w-[460px] text-sm leading-6 text-[#a09ca0]">
              Enter the email address you used to create your account
              <br className="hidden sm:block" /> and we’ll send you a link to
              reset your password.
            </p>
          </div>

          <ForgotPasswordForm />
        </div>
      </section>

      <aside
        className="hidden min-h-screen flex-1 overflow-hidden lg:block"
        aria-label="Agentwise real estate inspiration"
      >
        <img
          className="h-screen w-full object-cover object-top"
          src="/auth-collage.png"
          alt="A collage of real estate professionals, workspaces, and homes"
        />
      </aside>
    </main>
  )
}
