import { Navigate, Route, Routes } from 'react-router-dom';
import { Home } from '@/components/features/Home';
import { NotFound } from '@/components/features/NotFound';
import { PlaceholderPage } from '@/components/features/PlaceholderPage';
import { DashboardPlaceholder } from '@/pages/DashboardPlaceholder';
import { SignInPage } from '@/pages/SignInPage';
import { SignUpPage } from '@/pages/SignUpPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<PlaceholderPage title="Forgot your password?" />} />
      <Route path="/privacy-policy" element={<PlaceholderPage title="Privacy Policy" />} />
      <Route path="/terms-of-service" element={<PlaceholderPage title="Terms of Service" />} />
      <Route path="/dashboard" element={<DashboardPlaceholder />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
