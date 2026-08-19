import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import ForgotPassword from '../components/features/ForgotPassword';
import SignIn from '../components/features/SignIn';
import SignUp from '../components/features/SignUp';
import EmailVerification from '../components/features/EmailVerification';
import AppShell from '../components/layout/AppShell';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <AppShell>
              <div />
            </AppShell>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
