import { AuthImageCollage } from '../components/AuthImageCollage';
import { SignInForm } from '../components/SignInForm';
import './SignIn.css';

export function SignIn() {
  return (
    <main className="sign-in-page">
      <section className="sign-in-page__form-panel" aria-labelledby="sign-in-heading">
        <div className="sign-in-page__glow" aria-hidden="true" />

        <div className="sign-in-page__content">
          <header className="sign-in-page__header">
            <div className="sign-in-page__logo" aria-label="Agentwise">
              <span className="sign-in-page__logo-mark">Agentwise</span>
              <span className="sign-in-page__logo-tagline">Real Estate Marketing</span>
            </div>

            <h1 id="sign-in-heading" className="sign-in-page__heading">
              Welcome To Agentwise
            </h1>
            <p className="sign-in-page__subheading">
              Everything you need to create standout real estate content.
            </p>
          </header>

          <SignInForm />
        </div>
      </section>

      <AuthImageCollage />
    </main>
  );
}

export default SignIn;
