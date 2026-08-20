import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { breakpoints } from './theme/breakpoints';
import { Theme } from './theme';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

document.documentElement.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
document.documentElement.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
document.documentElement.style.setProperty('--breakpoint-desktop', breakpoints.desktop);

createRoot(rootElement).render(
  <StrictMode>
    <Theme>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Theme>
  </StrictMode>,
);
