import { Link, useLocation } from 'react-router-dom';
import './SimplePage.css';

interface WelcomeLocationState {
  name?: string;
  message?: string;
  description?: string;
}

function isWelcomeLocationState(value: unknown): value is WelcomeLocationState {
  return typeof value === 'object' && value !== null;
}

export function Welcome() {
  const location = useLocation();
  const state = isWelcomeLocationState(location.state) ? location.state : {};
  const name = state.name?.trim();
  const message = state.message?.trim() || 'Your account is ready.';
  const description =
    state.description?.trim() ||
    'You can now explore marketing resources and AI-powered tools for real estate professionals.';

  return (
    <main className="simple-page">
      <div className="simple-page__card">
        <p className="simple-page__eyebrow">Agentwise</p>
        <h1 className="simple-page__title">
          {name ? `Welcome, ${name}` : 'Welcome'}
        </h1>
        <p className="simple-page__lead">{message}</p>
        <p className="simple-page__body">{description}</p>
        <Link className="simple-page__link" to="/dashboard">
          Go to dashboard
        </Link>
      </div>
    </main>
  );
}

export default Welcome;
