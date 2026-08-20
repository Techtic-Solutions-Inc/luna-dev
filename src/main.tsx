import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './theme/breakpoints';
import './index.css';
import ErrorBoundary from './components/layout/ErrorBoundary';
import AppRouter from './routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>,
);
