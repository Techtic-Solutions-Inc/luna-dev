import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ContentCalendarDetailsPage } from '@/pages/ContentCalendarDetailsPage';
import { ContentCalendarPage } from '@/pages/ContentCalendarPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { ProfileContentGeneratedPage } from '@/pages/ProfileContentGeneratedPage';
import { ProfileDownloadsPage } from '@/pages/ProfileDownloadsPage';
import { ProfilePage } from '@/pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Navigate to="/dashboard" replace />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/content-calendar"
        element={
          <ProtectedRoute>
            <ContentCalendarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/content-calendar/details/:id"
        element={
          <ProtectedRoute>
            <ContentCalendarDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/downloads"
        element={
          <ProtectedRoute>
            <ProfileDownloadsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/content-generated"
        element={
          <ProtectedRoute>
            <ProfileContentGeneratedPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
