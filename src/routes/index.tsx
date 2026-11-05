import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "../components/layout/AppShell";
import { IconDemo } from "../components/IconDemo";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { FigmaScreenPage } from "../components/luna-figma/FigmaScreenPage";

const queryClient = new QueryClient();

function HomeRoute() {
  return <FigmaScreenPage routePath="home" />;
}

function SignInRoute() {
  return <FigmaScreenPage routePath="sign-in" />;
}

function SignUpRoute() {
  return <FigmaScreenPage routePath="sign-up" />;
}

export function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell>
          <IconDemo />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomeRoute />} />
            <Route path="/sign-in" element={<SignInRoute />} />
            <Route path="/login" element={<Navigate to="/sign-in" replace />} />
            <Route path="/sign-up" element={<SignUpRoute />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<FigmaScreenPage routePath="dashboard" />} />
            </Route>
            <Route path="*" element={<FigmaScreenPage />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
