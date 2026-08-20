import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/App';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { ThemeProvider } from '@/theme';
import { breakpoints } from '@/theme/breakpoints';
import '@/styles/global.css';

const container = document.getElementById('root');

if (container === null) {
  throw new Error('Root element #root was not found in index.html');
}

const rootElement = document.documentElement;
rootElement.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
rootElement.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
rootElement.style.setProperty('--breakpoint-desktop', breakpoints.desktop);

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
