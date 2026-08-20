import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { Theme } from './theme';
import { breakpoints } from './theme/breakpoints';

void breakpoints;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Theme>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Theme>
  </StrictMode>
);
