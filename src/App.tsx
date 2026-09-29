import { Navigate, Route, Routes } from "react-router-dom";
import { FigmaContentLibraryPage } from "@/components/luna-figma/FigmaContentLibraryPage";
import { FigmaScreenPage } from "@/components/luna-figma/FigmaScreenPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<FigmaScreenPage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/forgot-password" element={<FigmaScreenPage />} />
      <Route path="/login" element={<PlaceholderPage />} />
      <Route path="/about" element={<PlaceholderPage />} />
      <Route path="/content" element={<FigmaContentLibraryPage />} />
      <Route path="/blog" element={<PlaceholderPage />} />
      <Route path="/pricing" element={<PlaceholderPage />} />
      <Route path="/contact" element={<PlaceholderPage />} />
      <Route path="/privacy-policy" element={<PlaceholderPage />} />
      <Route path="/terms-of-service" element={<PlaceholderPage />} />
    </Routes>
  );
}
