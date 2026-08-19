import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Home from '../components/features/Home';
import SignIn from '../components/features/SignIn';
import SignUp from '../components/features/SignUp';
import ForgotPassword from '../components/features/ForgotPassword';
import EmailVerification from '../components/features/EmailVerification';
import ContentCalendar from '../components/features/ContentCalendar/ContentCalendar';
import ContentCalendarDetails from '../components/features/ContentCalendar/ContentCalendarDetails';
import Profile from '../components/features/Profile/Profile';
import DashboardPage from '../components/features/Dashboard/DashboardPage';
import NotFound from '../components/features/NotFound';

const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<EmailVerification />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppShell>
              <DashboardPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/content-calendar"
        element={
          <ProtectedRoute>
            <AppShell>
              <ContentCalendar />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/content-calendar/:id"
        element={
          <ProtectedRoute>
            <AppShell>
              <ContentCalendarDetails />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppShell>
              <Profile />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
