/**
 * Luna generated page
 * Figma frame: 1006:1333
 * Page: Sign Up
 * Route: /sign-up
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
"use client";

import "./figma-theme.css";
import "./figma-responsive.css";
import { FigmaFrameShell } from "./FigmaFrameShell";
import { useFigmaScreenData } from "./useFigmaScreenData";
import { SignUpSection_n_2779_25547 } from "./SignUpSection_n_2779_25547";
import { SignUpSection_n_1006_1334 } from "./SignUpSection_n_1006_1334";
import { SignUpContactSection } from "./SignUpContactSection";
import { SignUpSection_n_1006_1336 } from "./SignUpSection_n_1006_1336";
import { SignUpSection_n_1006_1338 } from "./SignUpSection_n_1006_1338";

export function SignUpPage() {
  const screenData = useFigmaScreenData();
  return (
    <div
      data-figma-bound={screenData.bound}
      data-figma-frame="1006:1333"
      className="relative flex w-full flex-col"
      style={{ backgroundColor: "#0b0b0b" }}
    >
      <main id="main-content" className="relative z-10 flex w-full flex-col">
        <FigmaFrameShell frameWidth={1440} frameHeight={850} nodeId="frame" focus={{ x: 100, y: 106, w: 461, h: 639 }}>
        <SignUpSection_n_2779_25547 />
        <SignUpSection_n_1006_1334 />
        <SignUpContactSection />
        <SignUpSection_n_1006_1336 />
        <SignUpSection_n_1006_1338 />
        </FigmaFrameShell>
      </main>
    </div>
  );
}
