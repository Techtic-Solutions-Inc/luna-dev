import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../components/AppLayout';

const DashboardPlaceholder = () => (
  <section aria-labelledby="dashboard-heading">
    <h1 id="dashboard-heading">Dashboard</h1>
    <p>Protected content area.</p>
  </section>
);

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <DashboardPlaceholder />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
