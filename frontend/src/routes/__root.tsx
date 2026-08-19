import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ContentCalendar from './ContentCalendar';

export default function RootRoutes() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/" element={<Navigate to="/content-calendar" replace />} />
        <Route path="/content-calendar" element={<ContentCalendar />} />
        <Route path="*" element={<Navigate to="/content-calendar" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
