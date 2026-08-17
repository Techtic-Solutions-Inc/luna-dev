import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import NotFound from '../components/features/NotFound';
import SignIn from '../components/features/SignIn';
import SignUp from '../components/features/SignUp';
import EmailVerification from './email-verification';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
