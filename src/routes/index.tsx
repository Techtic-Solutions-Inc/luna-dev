import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../components/404';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
