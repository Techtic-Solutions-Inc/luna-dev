import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import type { ComponentType, ReactNode } from 'react';
import Home from './Home';
import Signup from './Signup';
import NotFound from '../components/features/NotFound';

interface AppRouterProps {
  layout: ComponentType<{ children: ReactNode }>;
}

const AppRouter = ({ layout: Layout }: AppRouterProps) => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  </Router>
);

export default AppRouter;
