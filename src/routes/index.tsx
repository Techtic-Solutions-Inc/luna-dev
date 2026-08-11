import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Welcome from './Welcome';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
