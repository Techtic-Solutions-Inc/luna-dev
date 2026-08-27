import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import AppHome from '../components/features/AppHome';
import NotFound from '../components/404';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route index element={<AppHome />} />
      </Route>
      {/* Add protected routes here */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
