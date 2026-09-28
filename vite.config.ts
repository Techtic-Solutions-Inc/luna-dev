import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Luna ScreenSpec registry — re-emitted 3047:21447 Dashboard/Nav/Vertical (240×840). */
export const LUNA_SPEC_SECTIONS = [
  {
    nodeId: "3047:21447",
    name: "Dashboard/Nav/Vertical",
    widthPx: 240,
    heightPx: 840,
    className: "w-[240px] h-[840px]",
    mockupSrc: "/assets/figma/3047-21447.png",
    slotClassName: "w-full overflow-hidden h-[840px]",
    imgClassName: "w-full h-[840px] w-full object-cover object-top",
    childBitmaps: [] as const,
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
