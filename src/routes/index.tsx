import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/components/features/Home';
import LoginPage from '@/components/features/LoginPage';
import ProfilePage from '@/components/features/ProfilePage';
import AppShell from '@/components/layout/AppShell';
import ProtectedRoute from '@/components/layout/ProtectedRoute';
import NotFound from '@/components/404';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
