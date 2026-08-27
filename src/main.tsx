import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/toaster';
import { GlobalStyle, ThemeProvider } from './theme';
import { breakpoints } from './theme/breakpoints';
import { colors } from './theme/tokens';
import './index.css';

const themeColor = document.querySelector('meta[name="theme-color"]');
if (themeColor) {
  themeColor.setAttribute('content', colors.accent);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider theme={{ breakpoints }}>
        <GlobalStyle />
        <App />
        <Toaster />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
