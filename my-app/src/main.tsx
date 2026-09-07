import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { theme } from '@/theme/tokens'
import { breakpoints } from '@/theme/breakpoints'
import { GlobalStyle, StyledThemeProvider } from '@/theme'
import ErrorBoundary from '@/components/ErrorBoundary'
import App from './App'
import './index.css'

const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Root element not found')
}

Object.entries(breakpoints).forEach(([key, value]) => {
  document.documentElement.style.setProperty(`--breakpoint-${key}`, value)
})

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
