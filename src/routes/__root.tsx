import { Navigate, Route, Routes } from 'react-router-dom';
import EmailVerification from './EmailVerification';
import ForgotPassword from './ForgotPassword';
import Home from './Home';

export default function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
