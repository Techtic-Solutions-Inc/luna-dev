import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { VisitorHomePage } from "@/pages/VisitorHomePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<VisitorHomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<PlaceholderPage />} />
      <Route path="/about" element={<PlaceholderPage />} />
      <Route path="/content" element={<FigmaScreenPage />} />
      <Route path="/forgot-your-password" element={<FigmaScreenPage />} />
      <Route
        path="/forgot-password"
        element={<Navigate to="/forgot-your-password" replace />}
      />
      <Route path="/blog" element={<PlaceholderPage />} />
      <Route path="/pricing" element={<PlaceholderPage />} />
      <Route path="/contact" element={<PlaceholderPage />} />
      <Route path="/privacy-policy" element={<PlaceholderPage />} />
      <Route path="/terms-of-service" element={<PlaceholderPage />} />
    </Routes>
  );
}
