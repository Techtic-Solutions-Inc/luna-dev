import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UnauthorizedRedirect } from "@/components/auth/UnauthorizedRedirect";
import Home from "@/components/features/Home";
import { DemoProtectedPage } from "@/components/features/DemoProtectedPage";
import { LoginPage } from "@/components/features/auth/LoginPage";
import { MarketingStubPage } from "@/components/features/MarketingStubPage";
import { AppShell } from "@/components/layout/AppShell";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import NotFound from "@/components/NotFound";

export function AppRouter() {
  return (
    <BrowserRouter>
      <UnauthorizedRedirect />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about-us" element={<MarketingStubPage title="About Us" />} />
        <Route path="/blog" element={<MarketingStubPage title="Blog" />} />
        <Route path="/pricing" element={<MarketingStubPage title="Pricing" />} />
        <Route path="/subscription" element={<MarketingStubPage title="Subscription" />} />
        <Route path="/privacy-policy" element={<MarketingStubPage title="Privacy Policy" />} />
        <Route path="/terms-of-service" element={<MarketingStubPage title="Terms of Service" />} />
        <Route
          path="/content-library"
          element={<MarketingStubPage title="Content Library" />}
        />
        <Route
          path="/content-calendar"
          element={<MarketingStubPage title="Content Calendar" />}
        />
        <Route
          path="/ultimate-mind-dashboard"
          element={<MarketingStubPage title="Ultimate Mind Dashboard" />}
        />
        <Route path="/announcements" element={<MarketingStubPage title="Announcements" />} />
        <Route path="/downloads" element={<MarketingStubPage title="Downloads" />} />
        <Route
          path="/content-generated"
          element={<MarketingStubPage title="Content Generated" />}
        />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/demo-protected" element={<DemoProtectedPage />} />
        </Route>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
