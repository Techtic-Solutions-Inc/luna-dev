/**
 * Luna generated page
 * Figma frame: 2241:1459
 * Page: Home
 * Route: /home
 * Ownership: Figma-owned layout
 * Behavior: useFigmaScreenData / figmaFieldContract
 * luna-spec-codegen: owned-layout
 */
"use client";

import "./figma-fonts.css";
import { useState, useEffect } from "react";
import "./figma-responsive.css";
import { FigmaScreenDataProvider, useFigmaScreenData } from "./useFigmaScreenData";
import { HundredsSection } from "./HundredsSection";
import { MarketingThatStopsTheScrollSection } from "./MarketingThatStopsTheScrollSection";
import { CollectionSection } from "./CollectionSection";
import { BusinessAndMarketSection } from "./BusinessAndMarketSection";
import { StandOutSection } from "./StandOutSection";
import { AgentwiseUltimateMindSection } from "./AgentwiseUltimateMindSection";
import { JordanHayesSection } from "./JordanHayesSection";
import { LetSWorkTogetherSection } from "./LetSWorkTogetherSection";
import { HelloAgentwisemarketingComSection } from "./HelloAgentwisemarketingComSection";

function FigmaScreenContent() {
  const screenData = useFigmaScreenData();
  return (
    <div data-figma-bound={screenData.bound}
      data-figma-frame="2241:1459" className="relative flex min-h-screen w-full min-w-0 flex-col bg-color-27">
      <p role="status" aria-live="polite" className="sr-only">
        {screenData.statusMessage}
      </p>
      <main id="main-content" className="flex w-full min-w-0 flex-1 flex-col">
        <HundredsSection />
        <MarketingThatStopsTheScrollSection />
        <CollectionSection />
        <BusinessAndMarketSection />
        <StandOutSection />
        <AgentwiseUltimateMindSection />
        <JordanHayesSection />
        <LetSWorkTogetherSection />
        <HelloAgentwisemarketingComSection />
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div data-figma-node="2289:17290" className="box-border w-[1964px] h-[2875px] absolute left-[-44px] top-[1929px] z-[1] [--fx:-44] [--fww:1964] block">
            <div data-figma-node="2289:17245" className="box-border w-[1955px] h-[2875px] absolute left-[0px] [--fx:0] [--fww:1955] overflow-hidden opacity-[0.24] top-[calc(50%+0px)] -translate-y-1/2 block">
              <svg data-figma-node="2289:17246" viewBox="0 0 1924.8 3502.86" preserveAspectRatio="none" aria-hidden="true" className="box-border w-[1925px] absolute [--fx:44] [--fww:1925] left-[calc(50%+29px)] -translate-x-1/2 top-[0%] h-[121.843%] pointer-events-none overflow-visible"><path d="M0 0L1924.8 0L1924.8 3502.86L0 3502.86L0 0Z" fill="#000000" /></svg>
              <div data-figma-node="2295:3501" className="box-border w-[1920px] h-[3511px] absolute top-[0px] [--fx:44] [--fww:1920] left-[calc(50%+26px)] -translate-x-1/2 block bg-text-primary"></div>
              <div data-figma-node="2295:3507" className="box-border w-[1256px] h-[1541px] absolute left-[-141px] top-[1955px] [--fx:-141] [--fww:1256] rounded-[535.66px] blur-[112px] pointer-events-none block" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}></div>
            </div>
            <img data-figma-node="2264:10404" src="/assets/figma/2264-10404.png" alt="" aria-hidden="true" width={1920} height={2875} decoding="async" onError={e => { const img = e.currentTarget as HTMLImageElement; img.onerror = null; img.src = "data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23e5e7eb'/%3E%3C/svg%3E"; }} className="box-border w-[1920px] h-[2875px] absolute top-[0px] [--fx:44] [--fww:1920] left-[calc(50%+22px)] -translate-x-1/2 max-w-none object-cover object-top" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-[2]">
          <h2 data-figma-node="2264:10451" className="box-border w-[1394px] h-[110px] absolute left-[263px] top-[2009px] [--fx:263] [--fww:1394] bg-[#ffffff] font-eb-garamond text-[84px] font-[400] leading-[110px] capitalize text-center lg:whitespace-nowrap text-success">Stunning marketing, in three simple steps</h2>
        </div>
      </main>
    </div>
  );
}

export function FigmaScreenPage({ routePath }: { routePath?: string }) {
  const [path, setPath] = useState(() =>
    routePath ??
    (typeof window !== "undefined"
      ? window.location.pathname.replace(/^\/+|\/+$/g, "")
      : ""));
  useEffect(() => {
    if (routePath !== undefined) return;
    const handler = () =>
      setPath(window.location.pathname.replace(/^\/+|\/+$/g, ""));
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [routePath]);
  return (
    <FigmaScreenDataProvider routePath={path}>
      <FigmaScreenContent />
    </FigmaScreenDataProvider>
  );
}
