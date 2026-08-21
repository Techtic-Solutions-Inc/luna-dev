import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './lib/auth/AuthProvider';
import AppRouter from './routes';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRouter Layout={AppLayout} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
