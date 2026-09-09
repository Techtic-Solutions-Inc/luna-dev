import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ComponentType, ReactNode } from 'react';
import Home from './Home';
import VisitorHome from './VisitorHome';
import Signup from './Signup';
import Login from './Login';
import Terms from './Terms';
import Privacy from './Privacy';
import NotFound from '../components/features/NotFound';

interface AppRouterProps {
  layout: ComponentType<{ children: ReactNode }>;
}

const AppRouter = ({ layout: Layout }: AppRouterProps) => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/visitor-home" replace />} />
        <Route path="/visitor/home" element={<Navigate to="/visitor-home" replace />} />
        <Route path="/visitor-home" element={<VisitorHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRouter;
