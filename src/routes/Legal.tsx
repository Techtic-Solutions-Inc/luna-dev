import { Link } from 'react-router-dom';
import './SimplePage.css';

interface LegalPageProps {
  title: string;
  body: string;
}

function LegalPage({ title, body }: LegalPageProps) {
  return (
    <main className="simple-page">
      <div className="simple-page__card">
        <p className="simple-page__eyebrow">Agentwise</p>
        <h1 className="simple-page__title">{title}</h1>
        <p className="simple-page__body">{body}</p>
        <Link className="simple-page__link" to="/signup">
          Back to Sign Up
        </Link>
      </div>
    </main>
  );
}

export function Terms() {
  return (
    <LegalPage
      title="Terms of Use"
      body="These Terms of Use govern your access to the Agentwise Real Estate Professional platform."
    />
  );
}

export function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      body="This Privacy Policy explains how Agentwise collects, uses, and protects your information."
    />
  );
}
