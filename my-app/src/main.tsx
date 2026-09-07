import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { theme } from '@/theme/tokens'
import { GlobalStyle, StyledThemeProvider } from '@/theme'
import { breakpoints } from '@/theme/breakpoints'
import ErrorBoundary from '@/components/ErrorBoundary'
import App from './App'
import './index.css'

void breakpoints

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
      <StyledThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </StyledThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
