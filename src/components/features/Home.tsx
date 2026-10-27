import { useEffect } from "react";
import { FigmaScreenPage } from "@/components/luna-figma/FigmaScreenPage";
import { publishReadPayload } from "@/components/luna-figma/figmaDisplay";
import { useVisitorHome } from "@/hooks/useVisitorHome";

/** Visitor marketing home — Figma frame 2241:1459 */
export default function Home() {
  const { data } = useVisitorHome();

  useEffect(() => {
    publishReadPayload("GET", "/api/visitor/home", {
      success: true,
      message: "Static visitor home content",
      data,
    });
  }, [data]);

  return (
    <div className="flex w-full flex-col">
      <FigmaScreenPage routePath="" />
    </div>
  );
}
