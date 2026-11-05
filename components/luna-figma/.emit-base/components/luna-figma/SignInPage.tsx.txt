/**
 * Luna generated page
 * Figma frame: 998:1024
 * Page: Sign In
 * Route: /sign-in
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
"use client";

import "./figma-theme.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { SignInSection_n_1091_231 } from "./SignInSection_n_1091_231";
import { SignInSection_n_1001_1326 } from "./SignInSection_n_1001_1326";
import { SignInSection_n_1001_1330 } from "./SignInSection_n_1001_1330";
import { SignInWelcomeToAgentwiseSection } from "./SignInWelcomeToAgentwiseSection";
import { SignInSection_n_1001_1328 } from "./SignInSection_n_1001_1328";

export function SignInPage() {
  const screenData = useFigmaScreenData();
  return (
    <div
      data-figma-bound={screenData.bound}
      data-figma-frame="998:1024"
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main id="main-content" className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame" focus={{ x: 100, y: 152, w: 461, h: 545 }}>
        <SignInSection_n_1091_231 />
        <SignInSection_n_1001_1326 />
        <SignInSection_n_1001_1330 />
        <SignInWelcomeToAgentwiseSection />
        <SignInSection_n_1001_1328 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}
