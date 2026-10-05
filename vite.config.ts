import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const FIGMA_SPEC_PATH = path.join(ROOT, ".luna/context/figma_spec_design_specification.json");
const LUNA_FIGMA_DIR = path.join(ROOT, "src/components/luna-figma");

type SpecNode = {
  node_id?: string;
  name?: string;
  render_type?: string;
  asset_path?: string;
  x_px?: number;
  y_px?: number;
  width_px?: number;
  height_px?: number;
  clips_content?: boolean;
  border_radius?: number;
  children?: SpecNode[];
};

function walkSpecNodes(
  nodes: SpecNode[] | undefined,
  visit: (node: SpecNode, ancestors: SpecNode[]) => void,
  ancestors: SpecNode[] = [],
) {
  if (!nodes) return;
  for (const node of nodes) {
    visit(node, ancestors);
    walkSpecNodes(node.children, visit, [...ancestors, node]);
  }
}

function loadContentLibrarySpec(): SpecNode[] {
  if (!fs.existsSync(FIGMA_SPEC_PATH)) return [];
  const raw = JSON.parse(fs.readFileSync(FIGMA_SPEC_PATH, "utf8")) as Array<{
    design_spec?: { sections?: SpecNode[] };
  }>;
  const library = raw.find((entry) => entry.design_spec?.sections?.some((s) => s.node_id === "3047:21447"));
  return library?.design_spec?.sections ?? [];
}

function figmaIdToAssetFile(nodeId: string): string {
  return `/assets/figma/${nodeId.replace(/:/g, "-")}.png`;
}

function stampImageTag(node: SpecNode): string {
  const src = node.asset_path ?? figmaIdToAssetFile(node.node_id ?? "");
  const w = Math.round(node.width_px ?? 0);
  const h = Math.round(node.height_px ?? 0);
  const x = Math.round(node.x_px ?? 0);
  const y = Math.round(node.y_px ?? 0);
  return `<img data-figma-node="${node.node_id}" src="${src}" alt="" aria-hidden="true" className="pointer-events-none box-border w-[${w}px] h-[${h}px] absolute left-[${x}px] top-[${y}px] max-w-none object-cover object-top" />`;
}

/** Re-stamp compiled IMAGE/MOCKUP children for owned-layout sections from the Figma spec. */
function reemitOwnedLayoutSources() {
  const sections = loadContentLibrarySpec();
  if (sections.length === 0) return;

  const navPath = path.join(LUNA_FIGMA_DIR, "ContentLibraryVerticalNav.tsx");
  if (fs.existsSync(navPath)) {
    let nav = fs.readFileSync(navPath, "utf8");
    nav = nav.replace(/\s*<img data-figma-node="2147227827"[\s\S]*?\/>\n/g, "\n");
    nav = nav.replace(/\s*<img data-figma-node="2147227828"[\s\S]*?\/>\n/g, "\n");

    const navSection = sections.find((s) => s.node_id === "3047:21447");
    const imageStamps: string[] = [];
    walkSpecNodes(navSection ? [navSection] : [], (node) => {
      if (
        (node.render_type === "image" || node.render_type === "mockup") &&
        node.node_id &&
        node.asset_path
      ) {
        imageStamps.push(stampImageTag(node));
      }
    });

    if (imageStamps.length > 0 && !nav.includes('data-figma-node="I3047:21447;1237:1966"')) {
      // Spec-driven stamps only when the compiled logo slot is missing entirely.
      const insert = `\n${imageStamps.join("\n")}\n`;
      nav = nav.replace(
        /(<div data-figma-node="3047:21447"[^>]*>)/,
        `$1${insert}`,
      );
    }

    fs.writeFileSync(navPath, nav);
  }
}

function normalizeOwnedLayoutModule(code: string): string {
  let next = code;

  next = next.replace(
    /<span([^>]*data-figma-unrendered="vector"[^>]*)><\/span>/g,
    `<svg$1 data-figma-diagnostic="vector_geometry_unavailable" viewBox="0 0 12 12" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none overflow-visible"><path d="M0 0L12 0L12 12L0 12L0 0Z" fill="none" stroke="#828282" strokeWidth="1" /></svg>`,
  );

  next = next.replace(
    /<span([^>]*data-figma-diagnostic="vector_geometry_unavailable"[^>]*)><\/span>/g,
    `<svg$1 viewBox="0 0 12 12" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none overflow-visible"><path d="M0 0L12 0L12 12L0 12L0 0Z" fill="none" stroke="#828282" strokeWidth="1" /></svg>`,
  );

  return next;
}

/**
 * Luna owned-layout codegen contract (see luna-spec-codegen headers under src/components/luna-figma):
 * - VECTOR nodes → inline <svg> from compiled svg_paths, or data-figma-diagnostic="vector_geometry_unavailable"
 * - IMAGE/MOCKUP children → /assets/figma/<child-node-id>.png at compiled x_px/y_px; clip with overflow-hidden when clips_content
 */
function lunaOwnedLayoutCodegen(): Plugin {
  let reemitted = false;
  return {
    name: "luna-owned-layout-codegen",
    config() {
      return {
        envDir: ".",
      };
    },
    buildStart() {
      if (!reemitted) {
        reemitOwnedLayoutSources();
        reemitted = true;
      }
    },
    transform(code, id) {
      if (!id.includes("/src/components/luna-figma/") || !id.endsWith(".tsx")) {
        return null;
      }
      const normalized = normalizeOwnedLayoutModule(code);
      if (normalized === code) return null;
      return { code: normalized, map: null };
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
      "@": path.resolve(ROOT, "./src"),
    },
  },
});
