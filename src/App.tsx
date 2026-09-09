import AppRouter from './routes';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { Toaster } from './components/ui/sonner';

const App = () => (
  <ErrorBoundary>
    <AppRouter layout={AppLayout} />
    <Toaster />
  </ErrorBoundary>
);

export default App;
