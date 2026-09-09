import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import NotFound from '../components/404';
import Dashboard from '../components/features/Dashboard';
import Home from './Home';
import Login from './Login';
import VisitorHome from './visitor/home';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/visitor/home" element={<VisitorHome />} />
      <Route path="/login" element={<Login />} />
      <Route element={<AppShell />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
