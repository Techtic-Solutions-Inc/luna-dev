import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppHome from '@/components/features/AppHome';
import EmailVerification from '@/components/features/EmailVerification';
import ForgotPassword from '@/components/features/ForgotPassword';
import Home from '@/components/features/Home';
import NotFound from '@/components/features/NotFound';
import SignIn from '@/components/features/SignIn';
import SignUp from '@/components/features/SignUp';
import AppShell from '@/components/layout/AppShell';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell>
              <AppHome />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
