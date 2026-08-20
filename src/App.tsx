import ErrorBoundary from './components/layout/ErrorBoundary';
import AppRouter from './routes';
import { Theme } from './theme';

const App = () => (
  <Theme>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </Theme>
);

export default App;
