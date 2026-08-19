import AppRouter from '@/routes';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { Theme } from '@/theme';

export default function App() {
  return (
    <Theme>
      <ErrorBoundary>
        <AppRouter />
      </ErrorBoundary>
    </Theme>
  );
}
