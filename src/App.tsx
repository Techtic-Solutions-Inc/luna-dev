import AppRouter from './routes';
import ErrorBoundary from './components/layout/ErrorBoundary';
import Theme from './theme';

const App = () => (
  <Theme>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </Theme>
);

export default App;
