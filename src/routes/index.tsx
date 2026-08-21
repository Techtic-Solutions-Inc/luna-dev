import type { ComponentType, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import ContentCalendar from '../components/features/ContentCalendar';

interface AppRouterProps {
  Layout: ComponentType<{ children: ReactNode }>;
}

const AppRouter = ({ Layout }: AppRouterProps) => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Layout>
              <section className="flex flex-col gap-[var(--spacing-gap-24)]">
                <h1 className="font-heading text-[length:var(--typography-heading-xl-35-font-size)] font-medium leading-[var(--typography-heading-xl-35-line-height)] text-secondary">
                  Content calendar
                </h1>
                <ContentCalendar />
              </section>
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <Layout>
            <NotFound />
          </Layout>
        }
      />
    </Routes>
  </Router>
);

export default AppRouter;
