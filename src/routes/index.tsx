import type { ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import NotFound from "../components/NotFound";
import { FigmaScreenDataProvider } from "../components/luna-figma/useFigmaScreenData";
import { HomePage } from "../components/luna-figma/HomePage";
import { SignInPage } from "../components/luna-figma/SignInPage";
import { ProfilePage } from "../components/luna-figma/ProfilePage";

function withFigmaProvider(routePath: string, Page: () => ReactElement) {
  return (
    <FigmaScreenDataProvider routePath={routePath}>
      <Page />
    </FigmaScreenDataProvider>
  );
}

function StubPage({ title }: { title: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <h1 className="font-almarai text-success">{title}</h1>
    </main>
  );
}

const stubRoutes: { path: string; title: string }[] = [
  { path: "/pricing", title: "Pricing" },
  { path: "/blog", title: "Blog" },
  { path: "/content", title: "Content" },
  { path: "/contact", title: "Contact" },
  { path: "/join", title: "Join" },
  { path: "/forgot-password", title: "Forgot password" },
  { path: "/privacy-policy", title: "Privacy policy" },
  { path: "/terms-of-service", title: "Terms of service" },
  { path: "/announcements", title: "Announcements" },
];

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={withFigmaProvider("", HomePage)} />
        <Route path="/home" element={withFigmaProvider("home", HomePage)} />
        <Route path="/login" element={withFigmaProvider("login", SignInPage)} />
        <Route path="/sign-in" element={withFigmaProvider("sign-in", SignInPage)} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>{withFigmaProvider("profile", ProfilePage)}</ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>{withFigmaProvider("user-profile", ProfilePage)}</ProtectedRoute>
          }
        />
        {stubRoutes.map(({ path, title }) => (
          <Route key={path} path={path} element={<StubPage title={title} />} />
        ))}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
