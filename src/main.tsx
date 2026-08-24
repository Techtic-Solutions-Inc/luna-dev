import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { breakpoints } from './theme/breakpoints';

document.documentElement.style.setProperty('--bp-mobile', breakpoints.mobile);
document.documentElement.style.setProperty('--bp-tablet', breakpoints.tablet);
document.documentElement.style.setProperty('--bp-desktop', breakpoints.desktop);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
