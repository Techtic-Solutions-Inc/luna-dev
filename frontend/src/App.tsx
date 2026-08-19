import { Navigate, Route, Routes } from 'react-router-dom';
import { ContentCalendarDetailsPage } from '@/pages/ContentCalendarDetailsPage';
import { ContentCalendarPage } from '@/pages/ContentCalendarPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProfileContentGeneratedPage } from '@/pages/ProfileContentGeneratedPage';
import { ProfileDownloadsPage } from '@/pages/ProfileDownloadsPage';
import { ProfilePage } from '@/pages/ProfilePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/content-calendar" element={<ContentCalendarPage />} />
      <Route
        path="/content-calendar/details/:id"
        element={<ContentCalendarDetailsPage />}
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/downloads" element={<ProfileDownloadsPage />} />
      <Route
        path="/profile/content-generated"
        element={<ProfileContentGeneratedPage />}
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
