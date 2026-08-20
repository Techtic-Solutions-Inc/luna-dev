import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '../components/features/Dashboard';
import EmailVerification from '../components/features/EmailVerification';
import ForgotPassword from '../components/features/ForgotPassword';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import SignIn from '../components/features/SignIn';
import SignUp from '../components/features/SignUp';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/email-verification" element={<EmailVerification />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
