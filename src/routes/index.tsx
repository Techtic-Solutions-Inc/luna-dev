import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import ForgotPassword from '../components/features/ForgotPassword';
import SignIn from '../components/features/SignIn';
import SignUp from '../components/features/SignUp';
import VerifyEmail from '../components/features/VerifyEmail';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
