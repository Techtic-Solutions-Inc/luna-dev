import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardHome from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import SignIn from '../components/features/SignIn';
import SignUp from '../components/features/SignUp';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import EmailVerification from './EmailVerification';
import ForgotPassword from './ForgotPassword';
import Home from './Home';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/overview"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
