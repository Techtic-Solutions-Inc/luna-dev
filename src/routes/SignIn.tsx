import { Link } from 'react-router-dom';
import './SimplePage.css';

export function SignIn() {
  return (
    <main className="simple-page">
      <div className="simple-page__card">
        <p className="simple-page__eyebrow">Agentwise</p>
        <h1 className="simple-page__title">Sign in</h1>
        <p className="simple-page__lead">
          Sign in to continue to your Real Estate Professional workspace.
        </p>
        <p className="simple-page__body">
          Need an account?{' '}
          <Link className="simple-page__inline-link" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}

export default SignIn;
