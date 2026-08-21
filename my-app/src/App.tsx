import ErrorBoundary from './components/ErrorBoundary';
import AppRouter from './routes';

const App = () => (
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
);

export default App;
