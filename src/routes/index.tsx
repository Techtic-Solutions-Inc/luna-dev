import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import AuthLayout from '../components/layout/AuthLayout';
import EmailDesignLayout from '../components/layout/EmailDesignLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ForgotPasswordEmailPage from '../components/features/auth/ForgotPasswordEmailPage';
import ForgotPasswordPage from '../components/features/auth/ForgotPasswordPage';
import SignInPage from '../components/features/auth/SignInPage';
import SignUpPage from '../components/features/auth/SignUpPage';
import EmailVerificationPage from '../components/features/auth/EmailVerificationPage';
import DashboardPlaceholder from '../components/features/DashboardPlaceholder';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import { PATHS } from './paths';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route
        path={PATHS.SIGN_IN}
        element={
          <AuthLayout>
            <SignInPage />
          </AuthLayout>
        }
      />
      <Route
        path={PATHS.SIGN_UP}
        element={
          <AuthLayout>
            <SignUpPage />
          </AuthLayout>
        }
      />
      <Route
        path={PATHS.FORGOT_PASSWORD}
        element={
          <AuthLayout>
            <ForgotPasswordPage />
          </AuthLayout>
        }
      />
      <Route
        path={PATHS.FORGOT_PASSWORD_EMAIL}
        element={
          <EmailDesignLayout>
            <ForgotPasswordEmailPage />
          </EmailDesignLayout>
        }
      />
      <Route
        path={PATHS.VERIFY_EMAIL}
        element={
          <EmailDesignLayout>
            <EmailVerificationPage />
          </EmailDesignLayout>
        }
      />
      <Route
        path={PATHS.DASHBOARD}
        element={
          <ProtectedRoute>
            <AppShell>
              <DashboardPlaceholder />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
