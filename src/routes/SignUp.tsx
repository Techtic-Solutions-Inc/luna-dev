import { SignUpForm } from '../components/SignUpForm';
import './SignUp.css';

export function SignUp() {
  return (
    <main className="sign-up-page">
      <section className="sign-up-page__brand" aria-label="Agentwise brand">
        <div className="sign-up-page__brand-content">
          <p className="sign-up-page__brand-name">Agentwise</p>
          <h2 className="sign-up-page__brand-heading">
            Built for real estate professionals who move markets.
          </h2>
          <p className="sign-up-page__brand-copy">
            Manage your account, launch campaigns, and generate AI-powered
            content from one workspace.
          </p>
        </div>
        <div className="sign-up-page__atmosphere" aria-hidden="true" />
      </section>

      <section className="sign-up-page__panel">
        <div className="sign-up-page__panel-inner">
          <SignUpForm />
        </div>
      </section>
    </main>
  );
}

export default SignUp;
