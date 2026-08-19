import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Theme } from './theme';
import ErrorBoundary from './components/layout/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Theme>
  </StrictMode>,
);
