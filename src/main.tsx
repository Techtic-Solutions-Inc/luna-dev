import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import Theme from './theme/ThemeProvider';
import { breakpoints } from './theme/breakpoints';

void breakpoints;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>,
);
