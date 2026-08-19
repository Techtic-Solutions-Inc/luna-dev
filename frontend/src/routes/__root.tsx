import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ContentCalendar from './ContentCalendar';
import ContentCalendarDetails from './ContentCalendarDetails';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ProfileContentGenerated from './ProfileContentGenerated';
import ProfileDownloads from './ProfileDownloads';

export default function RootRoutes() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/content-calendar" element={<ContentCalendar />} />
        <Route
          path="/content-calendar/details/:id"
          element={<ContentCalendarDetails />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/downloads" element={<ProfileDownloads />} />
        <Route
          path="/profile/content-generated"
          element={<ProfileContentGenerated />}
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
