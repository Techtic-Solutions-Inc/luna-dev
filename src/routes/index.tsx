import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "styled-components";
import { AppShell } from "../components/layout/AppShell";
import { IconDemo } from "../components/IconDemo";
import { NotFound } from "../components/NotFound";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";
import { FigmaScreenPage } from "../components/luna-figma/FigmaScreenPage";
import { FigmaScreenDataProvider } from "../components/luna-figma/useFigmaScreenData";
import { SignInPage } from "../components/luna-figma/SignInPage";
import { SignUpPage } from "../components/luna-figma/SignUpPage";
import { VisitorHomePage } from "../pages/VisitorHomePage";
import { paths } from "./paths";

const queryClient = new QueryClient();

const SuccessBanner = styled.div`
  padding: 12px 24px;
  text-align: center;
  background: ${({ theme }) => theme.colors.color20};
  color: ${({ theme }) => theme.colors.success};
  font-family: ${({ theme }) => theme.fonts.almarai};
  border-bottom: 1px solid ${({ theme }) => theme.colors.info};
`;

function HomeRoute() {
  return (
    <FigmaScreenDataProvider routePath="home">
      <VisitorHomePage />
    </FigmaScreenDataProvider>
  );
}

function SignInRoute() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const signupSuccess =
    Boolean((location.state as { signupSuccess?: boolean } | null)?.signupSuccess) ||
    params.get("signupSuccess") === "1";

  return (
    <FigmaScreenDataProvider routePath="login">
      {signupSuccess ? (
        <SuccessBanner role="status">
          Your account was created. Sign in with your email and password.
        </SuccessBanner>
      ) : null}
      <SignInPage />
    </FigmaScreenDataProvider>
  );
}

function SignUpRoute() {
  return (
    <FigmaScreenDataProvider routePath="sign-up">
      <SignUpPage />
    </FigmaScreenDataProvider>
  );
}

export function AppRoutes() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppShell>
          <IconDemo />
          <Routes>
            <Route path={paths.home} element={<HomeRoute />} />
            <Route path="/home" element={<Navigate to={paths.home} replace />} />
            <Route path={paths.login} element={<SignInRoute />} />
            <Route path="/sign-in" element={<Navigate to={paths.login} replace />} />
            <Route path={paths.signUp} element={<SignUpRoute />} />
            <Route element={<ProtectedRoute />}>
              <Route path={paths.dashboard} element={<FigmaScreenPage routePath="dashboard" />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
