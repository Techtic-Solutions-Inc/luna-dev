import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/breakpoints';
import './index.css';
import ErrorBoundary from './components/layout/ErrorBoundary';
import AppRouter from './routes';
import { Theme } from './theme';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Theme>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Theme>
  </StrictMode>,
);
