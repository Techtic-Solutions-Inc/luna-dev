import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import Overview from '../components/features/Overview';
import PlaceholderPage from '../components/features/PlaceholderPage';
import NotFound from '../components/404';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/app" element={<Overview />} />
        <Route
          path="/app/library"
          element={
            <PlaceholderPage
              title="Content Library"
              description="Browse and generate listing content from the continuously updated collection."
            />
          }
        />
        <Route
          path="/app/calendar"
          element={
            <PlaceholderPage
              title="Content Calendar"
              description="Plan, schedule and review posts across your marketing channels."
            />
          }
        />
        <Route
          path="/app/ultimate-mind"
          element={
            <PlaceholderPage
              title="Ultimate Mind"
              description="Strategy, positioning and campaign thinking for your market."
            />
          }
        />
        <Route
          path="/app/announcements"
          element={
            <PlaceholderPage
              title="Announcements"
              description="Platform updates, events and editorial tips."
            />
          }
        />
        <Route
          path="/app/features"
          element={
            <PlaceholderPage
              title="New Features"
              description="See what just shipped in the Agentwise studio."
            />
          }
        />
        <Route
          path="/app/subscription"
          element={
            <PlaceholderPage
              title="Subscription"
              description="Manage your plan, billing and AI credit allocation."
            />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default AppRouter;
