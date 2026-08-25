import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import { AppThemeProvider } from './theme';
import { breakpoints } from './theme/breakpoints';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import './fonts';
import './index.css';

config.autoAddCss = false;

void breakpoints;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </AppThemeProvider>
  </StrictMode>,
);
