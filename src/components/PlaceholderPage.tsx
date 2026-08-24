import { Link } from 'react-router-dom';
import { FALLBACK_HOME_CONTENT } from '../data/homeContent';
import { Footer } from './Footer';
import { Header } from './Header';

interface PlaceholderPageProps {
  title: string;
  notFound?: boolean;
}

export function PlaceholderPage({ title, notFound = false }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen bg-page-bg text-white">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <div className="relative overflow-hidden bg-color-105">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-50" />
        <Header />
        <main id="main" className="relative mx-auto max-w-page px-5 py-24 text-center md:px-12">
          <h1 className="font-garamond text-page-title text-[48px] md:text-[72px]">{title}</h1>
          <p className="mx-auto mt-6 max-w-xl font-almarai text-body-18 text-color-134">
            {notFound
              ? 'This page does not exist. Head back home to keep exploring Agentwise.'
              : 'This page is part of the Agentwise visitor experience. Continue to home to see the full marketing story.'}
          </p>
          <Link to="/home" className="btn-primary mt-8">
            Back to Home
          </Link>
        </main>
      </div>
      <Footer links={FALLBACK_HOME_CONTENT.links} />
    </div>
  );
}
