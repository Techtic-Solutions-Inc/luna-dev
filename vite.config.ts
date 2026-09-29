import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Luna ScreenSpec registry — 3047:21447 Dashboard/Nav/Vertical (240×840). */
export const LUNA_SPEC_SECTIONS = [
  {
    nodeId: "1018:1101",
    name: "Group",
    widthPx: 266,
    heightPx: 266,
    className: "box-border w-[266px] h-[266px]",
    fillColor: "rgba(243, 50, 246, 0.2)",
    rootClassName: "box-border bg-[rgba(243,50,246,0.2)] h-[266px] w-[266px]",
  },
  {
    nodeId: "3047:21447",
    name: "Dashboard/Nav/Vertical",
    widthPx: 240,
    heightPx: 840,
    className: "w-[240px] h-[840px]",
    slotClassName: "w-full overflow-hidden h-[840px]",
    childBitmaps: [
      {
        nodeId: "I3047:21447;1237:1966",
        src: "/assets/figma/I3047-21447-1237-1966.png",
        xPx: 0,
        yPx: 0,
        widthPx: 240,
        heightPx: 80,
      },
      {
        nodeId: "I3047:21447;1237:2080",
        src: "/assets/figma/I3047-21447-1237-2080.png",
        xPx: 16,
        yPx: 80,
        widthPx: 208,
        heightPx: 736,
      },
    ] as const,
  },
  {
    nodeId: "3047:21253",
    name: "Content grid",
    widthPx: 1130,
    heightPx: 2226,
    className: "w-[1130px] h-[2226px]",
    slotClassName: "relative w-full overflow-hidden",
    childBitmaps: [
      {
        nodeId: "3047:21287",
        src: "/assets/figma/3047-21287.png",
        xPx: 48,
        yPx: 898,
        widthPx: 218,
        heightPx: 381,
      },
      {
        nodeId: "3047:21291",
        src: "/assets/figma/3047-21291.png",
        xPx: 335,
        yPx: 898,
        widthPx: 218,
        heightPx: 381,
      },
      {
        nodeId: "3047:21295",
        src: "/assets/figma/3047-21295.png",
        xPx: 622,
        yPx: 898,
        widthPx: 218,
        heightPx: 381,
      },
      {
        nodeId: "3047:21299",
        src: "/assets/figma/3047-21299.png",
        xPx: 909,
        yPx: 898,
        widthPx: 218,
        heightPx: 381,
      },
    ] as const,
  },
] as const;

export const LUNA_HASH_ANCHORS = [
  {
    href: "#contact",
    targetId: "contact",
    stampOnFile: "src/components/luna-figma/FigmaSection_n_1018_1107.tsx",
    stampOnNodeId: "1018:1107",
  },
] as const;

export default defineConfig({
    server: {
    proxy: {
      '/api': {
        target: process.env.LUNA_VALIDATION_API_PROXY_TARGET || 'http://174.138.72.184:4040',
        changeOrigin: true,
        secure: false,
      },
    },
    },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
