import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import SignInPage from '../components/features/auth/SignInPage';
import SignUpPage from '../components/features/auth/SignUpPage';
import ForgotPasswordPage from '../components/features/auth/ForgotPasswordPage';
import ForgotPasswordEmailPage from '../components/features/auth/ForgotPasswordEmailPage';
import EmailVerificationPage from '../components/features/auth/EmailVerificationPage';
import DashboardPlaceholder from '../components/features/DashboardPlaceholder';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password/email" element={<ForgotPasswordEmailPage />} />
      <Route path="/verify-email" element={<EmailVerificationPage />} />
      <Route path="/email-verification" element={<EmailVerificationPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPlaceholder />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
