import { Link } from 'react-router-dom';
import './SimplePage.css';

export function Dashboard() {
  return (
    <main className="simple-page">
      <div className="simple-page__card">
        <p className="simple-page__eyebrow">Agentwise</p>
        <h1 className="simple-page__title">Dashboard</h1>
        <p className="simple-page__lead">
          Your Real Estate Professional workspace is ready.
        </p>
        <Link className="simple-page__link" to="/signup">
          Back to Sign Up
        </Link>
      </div>
    </main>
  );
}

export default Dashboard;
