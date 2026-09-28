import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** Luna compiled spec strings (source parity for codegen mapper). */
export const LUNA_COMPILED_SPEC_TEXT = [
  'We started asking, "What if an agent could have a full marketing operation—social content, email sequences, and ad copy—without spending more than a few minutes a week on it?"  what would that free up? More client time, more deals, more life.',
  "Nova",
  "Coming Soon",
  "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  "Instagram Stories",
  "Instagram Feed",
] as const;

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target:
          process.env.LUNA_VALIDATION_API_PROXY_TARGET ||
          "http://174.138.72.184:4040",
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
