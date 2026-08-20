import ErrorBoundary from './components/layout/ErrorBoundary';
import AppRouter from './routes';

const App = () => (
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
);

export default App;
