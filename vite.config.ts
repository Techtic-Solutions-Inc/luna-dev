import path from "node:path";
import type { Plugin } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Luna ScreenSpec registry — 3047:21447 Dashboard/Nav/Vertical (240×840). */
export const LUNA_SPEC_SECTIONS = [
  {
    nodeId: "3047:21447",
    name: "Dashboard/Nav/Vertical",
    widthPx: 240,
    heightPx: 840,
    className: "w-[240px] h-[840px]",
    slotClassName: "w-full overflow-hidden h-[840px]",
    imgClassName: "w-full h-[840px] w-full object-cover object-top",
    childBitmaps: [
      {
        nodeId: "I3047:21447;1237:1966",
        src: "/assets/figma/I3047-21447-1237-1966.png",
        xPx: 0,
        yPx: 0,
        widthPx: 240,
        heightPx: 80,
      },
    ] as const,
  },
] as const;

export const LUNA_HASH_ANCHORS = [
  {
    href: "#contact",
    targetId: "contact",
    stampOnFile: "src/components/luna-figma/FigmaSection_n_1018_1101.tsx",
    stampOnNodeId: "1018:1101",
  },
] as const;

function lunaHashAnchorPlugin(): Plugin {
  return {
    name: "luna-hash-anchor",
    transform(code, id) {
      if (!id.includes("FigmaSection_n_1018_1101")) {
        return null;
      }
      if (code.includes('id="contact"')) {
        return null;
      }
      return {
        code: code.replace(
          '<section data-figma-node="1018:1101"',
          '<section id="contact" data-figma-node="1018:1101"',
        ),
        map: null,
      };
    },
  };
}

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
  plugins: [react(), tailwindcss(), lunaHashAnchorPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
