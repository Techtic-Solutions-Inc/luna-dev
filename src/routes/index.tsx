import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/components/features/Home';
import LoginPage from '@/components/features/LoginPage';
import ProfilePage from '@/components/features/ProfilePage';
import AppShell from '@/components/layout/AppShell';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import NotFound from '@/components/404';
import ForgotPassword from '@/routes/ForgotPassword';
import HomePage from '@/routes/HomePage';
import SignIn from '@/routes/SignIn';
import SignUp from '@/routes/SignUp';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/visitor/home" element={<HomePage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/settings/profile" element={<ProfilePage />} />
          <Route path="/profile" element={<Navigate to="/settings/profile" replace />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
