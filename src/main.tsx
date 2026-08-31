import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './theme';
import { AuthProvider } from './hooks/useAuth';
import { breakpoints } from './theme/breakpoints';
import { colors } from './theme/tokens';
import { queryClient } from './lib/queryClient';
import './index.css';

document.documentElement.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
document.documentElement.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
document.documentElement.style.setProperty('--breakpoint-desktop', breakpoints.desktop);

const themeColorMeta = document.querySelector('meta[name="theme-color"]');
if (themeColorMeta) {
  themeColorMeta.setAttribute('content', colors['color-22']);
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
);
