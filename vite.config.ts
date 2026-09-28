import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export {
  LUNA_COMPILED_SPEC_FILL,
  LUNA_COMPILED_SPEC_LOREM,
  LUNA_COMPILED_SPEC_SORT_BY,
  LUNA_COMPILED_SPEC_TEXT,
} from "./src/lib/luna-compiled-spec";

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
