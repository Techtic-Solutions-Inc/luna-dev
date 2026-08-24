import ErrorBoundary from './components/ErrorBoundary';
import AppRouter from './routes';
import { AppThemeProvider } from './theme';

function App() {
  return (
    <AppThemeProvider>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </AppThemeProvider>
  );
}

export default App;
