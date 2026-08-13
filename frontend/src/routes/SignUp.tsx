import { AuthImageCollage } from '../components/AuthImageCollage';
import { SignUpForm } from '../components/SignUpForm';
import './SignUp.css';

export function SignUp() {
  return (
    <main className="sign-up-page">
      <section className="sign-up-page__form-panel" aria-labelledby="sign-up-heading">
        <div className="sign-up-page__glow" aria-hidden="true" />

        <div className="sign-up-page__content">
          <header className="sign-up-page__header">
            <div className="sign-up-page__logo" aria-label="Agentwise">
              <span className="sign-up-page__logo-mark">Agentwise</span>
              <span className="sign-up-page__logo-tagline">Real Estate Marketing</span>
            </div>

            <h1 id="sign-up-heading" className="sign-up-page__heading">
              Great Marketing Made Easier.{' '}
              <em className="sign-up-page__heading-em">Specifically</em> For
              Agents
            </h1>
            <p className="sign-up-page__subheading">Create your account today</p>
          </header>

          <SignUpForm />
        </div>
      </section>

      <AuthImageCollage />
    </main>
  );
}

export default SignUp;
