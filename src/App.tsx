import { FigmaScreenPage } from "./components/luna-figma/FigmaScreenPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <>
      <FigmaScreenPage />
      <Toaster position="top-right" closeButton />
    </>
  );
}
