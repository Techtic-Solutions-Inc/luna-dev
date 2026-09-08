import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppThemeProvider } from './theme';
import ErrorBoundary from './components/ErrorBoundary';
import { Toaster } from './components/ui/sonner';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppThemeProvider>
        <App />
        <Toaster position="top-right" richColors closeButton />
      </AppThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
);
