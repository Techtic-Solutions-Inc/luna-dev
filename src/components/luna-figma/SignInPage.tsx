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
import { useFigmaScreenData } from "./useFigmaScreenData";
import { SignInSection_n_1091_231 } from "./SignInSection_n_1091_231";
import { SignInSection_n_1001_1326 } from "./SignInSection_n_1001_1326";
import { SignInSection_n_1001_1330 } from "./SignInSection_n_1001_1330";
import { SignInWelcomeToAgentwiseSection } from "./SignInWelcomeToAgentwiseSection";
import { SignInSection_n_1001_1328 } from "./SignInSection_n_1001_1328";

export function SignInPage() {
  const screenData = useFigmaScreenData();
  return (
    <div data-figma-bound={screenData.bound}
      data-figma-frame="998:1024" className="relative flex min-h-screen w-full min-w-0 flex-col bg-color-46">
      <main id="main-content" className="flex w-full min-w-0 flex-1 flex-col">
        <div className="w-full min-w-0 overflow-x-auto">
          <SignInSection_n_1001_1326 />
        </div>
        <div className="w-full min-w-0 overflow-x-auto">
          <SignInSection_n_1001_1330 />
        </div>
        <div className="w-full min-w-0 overflow-x-auto">
          <SignInSection_n_1001_1328 />
        </div>
        <div className="flex w-full min-w-0 flex-col items-start md:flex-row">
        <SignInSection_n_1091_231 />
        <SignInWelcomeToAgentwiseSection />
        </div>
      </main>
    </div>
  );
}
