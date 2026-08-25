import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/features/Home';
import DashboardOverview from '../components/features/DashboardOverview';
import AppShell from '../components/layout/AppShell';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import NotFound from '../components/404';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/studio"
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="overview" element={<DashboardOverview />} />
        <Route
          path="content-library"
          element={
            <StudioPlaceholder
              title="Content Library"
              imageSrc="/images/content-library.png"
              imageAlt="Content Library"
            />
          }
        />
        <Route
          path="content-calendar"
          element={
            <StudioPlaceholder
              title="Content Calendar"
              imageSrc="/images/content-calander.png"
              imageAlt="Content Calendar"
            />
          }
        />
        <Route
          path="ultimate-mind"
          element={
            <StudioPlaceholder
              title="Ultimate Mind"
              imageSrc="/images/ultimate-mind.png"
              imageAlt="Ultimate Mind"
            />
          }
        />
        <Route
          path="announcements"
          element={
            <StudioPlaceholder
              title="Announcements"
              imageSrc="/images/announcements.png"
              imageAlt="Announcements"
            />
          }
        />
        <Route
          path="new-features"
          element={
            <StudioPlaceholder
              title="New Features"
              imageSrc="/images/dashboard.png"
              imageAlt="New Features"
            />
          }
        />
        <Route
          path="subscription"
          element={
            <StudioPlaceholder
              title="Subscription"
              imageSrc="/images/subscription.png"
              imageAlt="Subscription"
            />
          }
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

interface StudioPlaceholderProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

function StudioPlaceholder({ title, imageSrc, imageAlt }: StudioPlaceholderProps) {
  return (
    <div className="px-padding-24 py-padding-40 tablet:px-padding-40 desktop:px-padding-60">
      <h1 className="font-garamond text-[36px] font-semibold leading-[46.98px] text-secondary">
        {title}
      </h1>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="mt-gap-32 w-full max-w-[1100px] rounded-radius-16 shadow-drop-shadow-39"
      />
    </div>
  );
}

export default AppRouter;
