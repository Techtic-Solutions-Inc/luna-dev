import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Theme } from './theme';
import { breakpoints } from './theme/breakpoints';
import ErrorBoundary from './components/layout/ErrorBoundary';
import AppRouter from './routes';

void breakpoints;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Theme>
  </StrictMode>,
);
