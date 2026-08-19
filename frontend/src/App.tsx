import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { Theme } from './theme';
import AppRouter from './routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <AppRouter />
        </QueryClientProvider>
      </Theme>
    </ErrorBoundary>
  );
}
