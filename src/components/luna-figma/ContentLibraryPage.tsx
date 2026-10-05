/**
 * Luna generated page
 * Figma frame: 3047:21237
 * Page: Content Library
 * Route: /content
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import "./figma-fonts.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { Section_n_3047_21238 } from "./Section_n_3047_21238";
import { MarketUpdateAustinQ2Section } from "./MarketUpdateAustinQ2Section";
import { TheCompleteAgentwiseContentLibrarySection } from "./TheCompleteAgentwiseContentLibrarySection";
import { IconButtonSection } from "./IconButtonSection";
import { Section_n_3047_21857 } from "./Section_n_3047_21857";
import { Section_n_3047_21251 } from "./Section_n_3047_21251";
import { Section_n_3047_21332 } from "./Section_n_3047_21332";
import { Section_n_3047_21253 } from "./Section_n_3047_21253";
import { Section_n_3047_21443 } from "./Section_n_3047_21443";
import { ContentLibraryVerticalNav } from "./ContentLibraryVerticalNav";

export function ContentLibraryPage() {
  const screenData = useFigmaScreenData();
  return (
    <div
      data-figma-bound={screenData.bound}
      data-figma-frame="3047:21237"
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={1043} nodeId="frame">
        <Section_n_3047_21238 />
        <MarketUpdateAustinQ2Section />
        <TheCompleteAgentwiseContentLibrarySection />
        <IconButtonSection />
        <Section_n_3047_21857 />
        <Section_n_3047_21251 />
        <Section_n_3047_21332 />
        <Section_n_3047_21253 />
        <Section_n_3047_21443 />
        <div className="pointer-events-none absolute inset-0 z-[10]">
          <ContentLibraryVerticalNav />
        </div>
        </FigmaFrameShell>
      </main>
    </div>
  );
}
