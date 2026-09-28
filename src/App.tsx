import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { LunaFigmaApiBridge } from "./components/luna-figma/LunaFigmaApiBridge";
import { Navigate, Route, Routes } from "react-router-dom";
import { AboutUsPage } from "@/pages/AboutUsPage";
import { PlaceholderPage } from "@/pages/PlaceholderPage";

function FigmaHomeRoute() {
  return (
    <>
      <LunaFigmaApiBridge screen="home" />
      <FigmaScreenPage />
    </>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<FigmaHomeRoute />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/login" element={<PlaceholderPage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/content" element={<PlaceholderPage />} />
      <Route path="/blog" element={<PlaceholderPage />} />
      <Route path="/pricing" element={<PlaceholderPage />} />
      <Route path="/contact" element={<PlaceholderPage />} />
      <Route path="/privacy-policy" element={<PlaceholderPage />} />
      <Route path="/terms-of-service" element={<PlaceholderPage />} />
    </Routes>
  );
}
