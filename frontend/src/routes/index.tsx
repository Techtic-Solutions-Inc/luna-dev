import { Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { ForgotPassword } from './ForgotPassword';
import { Home } from './Home';
import { Privacy, Terms } from './Legal';
import { SignIn } from './SignIn';
import { SignUp } from './SignUp';
import { Welcome } from './Welcome';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/sign-up" element={<Navigate to="/signup" replace />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/sign-in" element={<Navigate to="/signin" replace />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
