import { FigmaScreenPage } from "@/components/luna-figma/FigmaScreenPage";
import { useVisitorHome } from "@/hooks/useVisitorHome";

/** Visitor marketing home — Figma frame 2241:1459 */
export default function Home() {
  useVisitorHome();

  return (
    <div className="flex w-full flex-col">
      <FigmaScreenPage routePath="" />
    </div>
  );
}
