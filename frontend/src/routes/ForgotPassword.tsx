import { Link } from 'react-router-dom';
import './SimplePage.css';

export function ForgotPassword() {
  return (
    <main className="simple-page">
      <div className="simple-page__card">
        <p className="simple-page__eyebrow">Agentwise</p>
        <h1 className="simple-page__title">Reset password</h1>
        <p className="simple-page__lead">
          Enter the email address you used to create your account and we will
          send you a link to reset your password.
        </p>
        <p className="simple-page__body">
          Remembered your password?{' '}
          <Link className="simple-page__inline-link" to="/signin">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
