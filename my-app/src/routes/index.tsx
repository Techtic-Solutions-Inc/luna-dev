import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Home from '../components/features/Home';
import Dashboard from '../components/features/Dashboard';
import NotFound from '../components/404';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Router>
);

export default AppRouter;
