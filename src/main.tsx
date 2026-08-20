import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { breakpoints } from './theme/breakpoints';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

document.documentElement.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
document.documentElement.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
document.documentElement.style.setProperty('--breakpoint-desktop', breakpoints.desktop);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
