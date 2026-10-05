/**
 * Luna generated page
 * Figma frame: 1018:1100
 * Page: Forgot your password?
 * Route: /forgot-your-password
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
import "./figma-fonts.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { Section_n_1091_246 } from "./Section_n_1091_246";
import { Section_n_1018_1101 } from "./Section_n_1018_1101";
import { Section_n_1018_1105 } from "./Section_n_1018_1105";
import { ResetPasswordSection } from "./ResetPasswordSection";
import { Section_n_1018_1103 } from "./Section_n_1018_1103";

export function ForgotYourPasswordPage() {
  const screenData = useFigmaScreenData();
  return (
    <div
      data-figma-bound={screenData.bound}
      data-figma-frame="1018:1100"
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame">
        <Section_n_1091_246 />
        <Section_n_1018_1101 />
        <Section_n_1018_1105 />
        <ResetPasswordSection />
        <Section_n_1018_1103 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}
