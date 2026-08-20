import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { Theme } from './theme';
import { breakpoints } from './theme/breakpoints';

const rootElement = document.documentElement;
rootElement.style.setProperty('--breakpoint-mobile', breakpoints.mobile);
rootElement.style.setProperty('--breakpoint-tablet', breakpoints.tablet);
rootElement.style.setProperty('--breakpoint-desktop', breakpoints.desktop);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
);
