import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Home from './Home';
import VisitorHome from '../routes/visitor/home';
import Dashboard from '../components/features/Dashboard';
import NotFound from '../components/404';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visitor/home" element={<VisitorHome />} />
      <Route element={<AppShell />}>
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
