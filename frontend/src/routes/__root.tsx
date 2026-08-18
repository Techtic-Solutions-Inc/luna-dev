import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ContentCalendarRoute from './content-calendar';
import ContentCalendarDetailsRoute from './content-calendar-details';
import DashboardRoute from './dashboard';
import ProfileRoute from './profile';
import ProfileContentGeneratedRoute from './profile-content-generated';
import ProfileDownloadsRoute from './profile-downloads';

export default function RootRoutes() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/overview" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/content-calendar" element={<ContentCalendarRoute />} />
        <Route
          path="/content-calendar/details"
          element={<ContentCalendarDetailsRoute />}
        />
        <Route path="/profile" element={<ProfileRoute />} />
        <Route path="/profile/downloads" element={<ProfileDownloadsRoute />} />
        <Route
          path="/profile/content-generated"
          element={<ProfileContentGeneratedRoute />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
