import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "@/lib/auth/RequireAuth";
import { DashboardPage } from "@/pages/DashboardPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { HomePage } from "@/pages/HomePage";
import { SignInPage } from "@/pages/SignInPage";
import { SignUpPage } from "@/pages/SignUpPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
