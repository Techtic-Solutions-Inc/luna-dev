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
        <Route path="*" element={<NotFound />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
