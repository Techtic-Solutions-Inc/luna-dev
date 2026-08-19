import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { breakpoints } from './theme/breakpoints';
import './index.css';

document.documentElement.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
document.documentElement.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
document.documentElement.style.setProperty('--breakpoint-desktop', breakpoints.desktop);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root was not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
