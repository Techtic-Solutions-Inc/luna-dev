import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Spinner from '../components/ui/Spinner';
import { DashboardProvider } from '../contexts/DashboardContext';

const Home = lazy(() => import('../components/features/Home'));
const NotFound = lazy(() => import('../components/features/NotFound'));
const Dashboard = lazy(() => import('../components/features/Dashboard'));

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-[var(--color-16)]">
    <Spinner label="Loading page" size="lg" />
  </div>
);

const AppRouter = () => (
  <Router>
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <AppShell>
                  <Dashboard />
                </AppShell>
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </Router>
);

export default AppRouter;
