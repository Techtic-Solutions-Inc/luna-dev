import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { App } from '@/App';
import '@/index.css';
import '@fontsource/almarai/300.css';
import '@fontsource/almarai/400.css';
import '@fontsource/almarai/700.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
