import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * Luna owned-layout codegen contract (see luna-spec-codegen headers under src/components/luna-figma):
 * - VECTOR nodes → inline <svg> from compiled svg_paths, or data-figma-diagnostic="vector_geometry_unavailable"
 * - IMAGE/MOCKUP children → /assets/figma/<child-node-id>.png at compiled x_px/y_px; clip with overflow-hidden when clips_content
 */
function lunaOwnedLayoutCodegen(): Plugin {
  return {
    name: "luna-owned-layout-codegen",
    config() {
      return {
        envDir: ".",
      };
    },
  };
}

export default defineConfig({
  envDir: ".",
  server: {
    proxy: {
      "/api": {
        target:
          process.env.LUNA_VALIDATION_API_PROXY_TARGET ||
          process.env.VITE_API_BASE_URL ||
          "http://127.0.0.1:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [lunaOwnedLayoutCodegen(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
