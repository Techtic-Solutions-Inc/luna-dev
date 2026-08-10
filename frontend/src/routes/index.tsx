import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import AppShell from '../components/layout/AppShell';
import ProfileForm from '../components/features/ProfileForm';
import { ProtectedRoute } from '../hooks/useAuth';
import ErrorBoundary from '../components/ErrorBoundary';
import AboutUsPage from './about-us';

const AppRouter = () => (
  <Router>
    <ErrorBoundary>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileForm />
              </ProtectedRoute>
            }
          />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </AppShell>
    </ErrorBoundary>
  </Router>
);

export default AppRouter;
