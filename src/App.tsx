import { FigmaAboutScreenPage } from "./components/luna-figma/FigmaAboutScreenPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { PlaceholderPage } from "@/pages/PlaceholderPage";
import { VisitorHomePage } from "@/pages/VisitorHomePage";

/**
 * Home (JAW-9721): VisitorHomePage — SiteHeader/SiteFooter, sections, loading/error/retry.
 * About (JAW-9755): Figma-owned compiled frame approved as shipping layout; API via LunaFigmaApiBridge.
 */
export function App() {
  return (
    <Routes>
      <Route path="/" element={<VisitorHomePage />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<PlaceholderPage />} />
      <Route path="/about" element={<FigmaAboutScreenPage />} />
      <Route path="/content" element={<PlaceholderPage />} />
      <Route path="/blog" element={<PlaceholderPage />} />
      <Route path="/pricing" element={<PlaceholderPage />} />
      <Route path="/contact" element={<PlaceholderPage />} />
      <Route path="/privacy-policy" element={<PlaceholderPage />} />
      <Route path="/terms-of-service" element={<PlaceholderPage />} />
    </Routes>
  );
}
