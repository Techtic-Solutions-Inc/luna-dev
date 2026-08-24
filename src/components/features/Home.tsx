import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { AsyncStatus } from '../../types/api';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import IconDemo from '../ui/IconDemo';
import Spinner from '../ui/Spinner';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated, setToken, clearToken } = useAuth();
  const signedIn = isAuthenticated();
  const [status, setStatus] = useState<AsyncStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('Unable to load the workspace.');

  const hydrate = useCallback(() => {
    setStatus('loading');
    setErrorMessage('Unable to load the workspace.');
    try {
      setStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load the workspace.');
      setStatus('error');
    }
  }, []);

  const handleDemoSignIn = () => {
    setToken('demo-session-token');
  };

  const handleDemoSignOut = () => {
    clearToken();
  };

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-color-16">
        <Spinner label="Loading workspace" />
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-color-16 p-padding-24">
        <ErrorState message={errorMessage} onRetry={hydrate} />
      </main>
    );
  }

  if (status === 'empty') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-color-16 p-padding-24">
        <EmptyState
          title="Workspace not initialized"
          message="Reload to set up the Agentwise frontend shell."
          action={
            <Button type="button" onClick={hydrate}>
              Reload
            </Button>
          }
        />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-color-16 px-padding-24 py-padding-40 text-secondary md:px-padding-60">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-gap-24">
        <p className="typo-caption-4 uppercase tracking-[0.18em] text-accent">
          Real Estate Marketing
        </p>
        <h1 className="typo-heading-xl-36 text-secondary">Agentwise</h1>
        <p className="typo-body-44 text-color-15">
          Frontend project setup is ready. Routing, auth gate, API client, and the Figma design
          token system are in place for feature work.
        </p>
        <div className="flex flex-wrap items-center gap-gap-12">
          {signedIn ? (
            <>
              <Button type="button" onClick={() => navigate('/app')}>
                Open studio
              </Button>
              <Button type="button" variant="ghost" onClick={handleDemoSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button type="button" onClick={handleDemoSignIn}>
                Demo sign in
              </Button>
              <Button type="button" variant="ghost" disabled>
                Studio requires a session
              </Button>
            </>
          )}
          <Button type="button" variant="ghost" onClick={() => navigate('/not-a-real-page')}>
            View 404
          </Button>
        </div>
        <ul className="grid gap-gap-12 rounded-radius-16 border border-color-26 bg-color-89 p-padding-24 typo-body-15 text-color-15 md:grid-cols-2">
          <li className="flex items-center gap-gap-8">
            <span className="text-accent" aria-hidden="true">
              <IconDemo />
            </span>
            Font Awesome icons
          </li>
          <li>Vite + React + TypeScript</li>
          <li>React Router shell</li>
          <li>Axios API client</li>
          <li>Auth gate + AppShell</li>
          <li>Error, loading, empty states</li>
          <li>Figma tokens in theme + Tailwind</li>
        </ul>
      </div>
    </main>
  );
}
