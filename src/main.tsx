import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Theme } from './theme';
import ErrorBoundary from './components/layout/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Theme>
  </React.StrictMode>
);
