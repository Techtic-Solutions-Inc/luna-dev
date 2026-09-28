/** luna-spec-codegen: owned-layout */
import "./figma-fonts.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { FigmaSection_n_3361_6461 } from "./FigmaSection_n_3361_6461";
import { FigmaSection_n_3527_5463 } from "./FigmaSection_n_3527_5463";
import { FigmaSection_n_3785_1859 } from "./FigmaSection_n_3785_1859";
import { FigmaSection_n_4008_20203 } from "./FigmaSection_n_4008_20203";
import { FigmaSection_n_632_836 } from "./FigmaSection_n_632_836";
import { FigmaSection_n_856_1700 } from "./FigmaSection_n_856_1700";
import { FigmaSection_n_863_4306 } from "./FigmaSection_n_863_4306";
import { LunaFigmaApiBridge } from "./LunaFigmaApiBridge";

export function FigmaAboutScreenPage() {
  return (
    <div
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0e0d0d" }}
    >
      <LunaFigmaApiBridge screen="about" />
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1920} frameHeight={6158} nodeId="frame">
          <FigmaSection_n_3361_6461 />
          <FigmaSection_n_3527_5463 />
          <FigmaSection_n_3785_1859 />
          <FigmaSection_n_4008_20203 />
          <FigmaSection_n_632_836 />
          <FigmaSection_n_856_1700 />
          <FigmaSection_n_863_4306 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}
