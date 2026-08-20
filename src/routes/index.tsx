import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmailVerificationPage from '../components/features/auth/EmailVerificationPage';
import ForgotPasswordPage from '../components/features/auth/ForgotPasswordPage';
import SignInPage from '../components/features/auth/SignInPage';
import SignUpPage from '../components/features/auth/SignUpPage';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
