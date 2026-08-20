import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { Spinner } from '@/components/ui/Spinner';

const Home = lazy(() => import('@/components/features/Home').then((m) => ({ default: m.Home })));
const Dashboard = lazy(() =>
  import('@/components/features/Dashboard').then((m) => ({ default: m.Dashboard })),
);
const NotFound = lazy(() =>
  import('@/components/features/NotFound').then((m) => ({ default: m.NotFound })),
);

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-color-16">
      <Spinner size="lg" label="Loading page" />
    </div>
  );
}

/**
 * Application routing shell. Screens are code-split, so every route renders
 * behind a `Suspense` boundary with the shared loading state.
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRouter;
