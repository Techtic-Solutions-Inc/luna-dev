import { AuthImageCollage } from '../components/AuthImageCollage';
import { ForgotPasswordForm } from '../components/ForgotPasswordForm';
import './ForgotPassword.css';

export function ForgotPassword() {
  return (
    <main className="forgot-password-page">
      <section
        className="forgot-password-page__form-panel"
        aria-labelledby="forgot-password-heading"
      >
        <div className="forgot-password-page__glow" aria-hidden="true" />

        <div className="forgot-password-page__content">
          <header className="forgot-password-page__header">
            <div className="forgot-password-page__logo" aria-label="Agentwise">
              <span className="forgot-password-page__logo-mark">Agentwise</span>
              <span className="forgot-password-page__logo-tagline">
                Real Estate Marketing
              </span>
            </div>

            <h1
              id="forgot-password-heading"
              className="forgot-password-page__heading"
            >
              Reset Password
            </h1>
            <p className="forgot-password-page__subheading">
              Enter the email address you used to create your account and
              we&apos;ll send you a link to reset your password.
            </p>
          </header>

          <ForgotPasswordForm />
        </div>
      </section>

      <AuthImageCollage />
    </main>
  );
}

export default ForgotPassword;
