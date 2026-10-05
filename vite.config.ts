import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const FIGMA_SPEC_PATH = path.join(ROOT, ".luna/context/figma_spec_design_specification.json");
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
  border_radius?: number | number[];
  children?: SpecNode[];
};

type SpecEntry = {
  design_spec?: { sections?: SpecNode[] };
};

type ImageStamp = {
  nodeId: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  clipRadius?: number;
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

function loadContentLibrarySections(): SpecNode[] {
  if (!fs.existsSync(FIGMA_SPEC_PATH)) return [];
  const raw = JSON.parse(fs.readFileSync(FIGMA_SPEC_PATH, "utf8")) as SpecEntry[];
  const library = raw.find((entry) =>
    entry.design_spec?.sections?.some((s) => s.node_id === "3047:21447"),
  );
  return library?.design_spec?.sections ?? [];
}

function findSpecSection(sections: SpecNode[], nodeId: string): SpecNode | undefined {
  let found: SpecNode | undefined;
  walkSpecNodes(sections, (node) => {
    if (node.node_id === nodeId) found = node;
  });
  return found;
}

function figmaIdToAssetFile(nodeId: string): string {
  return `/assets/figma/${nodeId.replace(/:/g, "-")}.png`;
}

function collectImageStamps(root: SpecNode, originX = 0, originY = 0): ImageStamp[] {
  const stamps: ImageStamp[] = [];
  const walk = (node: SpecNode, ox: number, oy: number) => {
    const nx = ox + Math.round(node.x_px ?? 0);
    const ny = oy + Math.round(node.y_px ?? 0);
    if (
      (node.render_type === "image" || node.render_type === "mockup") &&
      node.node_id
    ) {
      const src = node.asset_path ?? figmaIdToAssetFile(node.node_id);
      stamps.push({
        nodeId: node.node_id,
        src,
        x: nx,
        y: ny,
        w: Math.round(node.width_px ?? 0),
        h: Math.round(node.height_px ?? 0),
        clipRadius:
          typeof node.border_radius === "number"
            ? Math.round(node.border_radius)
            : Array.isArray(node.border_radius)
              ? Math.round(node.border_radius[0] ?? 0)
              : undefined,
      });
    }
    if (node.children) {
      for (const child of node.children) walk(child, nx, ny);
    }
  };
  walk(root, originX, originY);
  return stamps;
}

function stampImageTag(stamp: ImageStamp): string {
  const radius =
    stamp.clipRadius && stamp.clipRadius > 0 ? ` rounded-[${stamp.clipRadius}px]` : "";
  return `<img data-figma-node="${stamp.nodeId}" src="${stamp.src}" alt="" aria-hidden="true" className="pointer-events-none box-border w-[${stamp.w}px] h-[${stamp.h}px] absolute left-[${stamp.x}px] top-[${stamp.y}px] max-w-none object-cover object-top${radius}" />`;
}

function ensureSectionRootHeight(code: string, nodeId: string, heightPx: number): string {
  const re = new RegExp(
    `(<(?:div|section)[^>]*data-figma-node="${nodeId.replace(/:/g, "\\:")}"[^>]*className=")([^"]*)(")`,
  );
  return code.replace(re, (_match, open, classes, close) => {
    let next = classes as string;
    if (!/\bh-\[\d+px\]/.test(next)) {
      next = `${next} h-[${heightPx}px]`;
    }
    if (!next.includes("box-border")) next = `box-border ${next}`;
    if (!next.includes("overflow-hidden")) next = `${next} overflow-hidden`;
    return `${open}${next.trim()}${close}`;
  });
}

function stripInventedNavGlows(code: string): string {
  return code
    .replace(/\s*<img data-figma-node="2147227827"[\s\S]*?\/>\n/g, "\n")
    .replace(/\s*<img data-figma-node="2147227828"[\s\S]*?\/>\n/g, "\n");
}

function injectMissingImageStamps(code: string, sectionRoot: SpecNode): string {
  const stamps = collectImageStamps(sectionRoot);
  let next = code;
  for (const stamp of stamps) {
    if (next.includes(`data-figma-node="${stamp.nodeId}"`)) continue;
    const tag = stampImageTag(stamp);
    const rootId = sectionRoot.node_id ?? "";
    const rootRe = new RegExp(
      `(<(?:div|section)[^>]*data-figma-node="${rootId.replace(/:/g, "\\:")}"[^>]*>)`,
    );
    if (rootRe.test(next)) {
      next = next.replace(rootRe, `$1\n            ${tag}`);
    }
  }
  return next;
}

function fixInstagramReelGradientVector(code: string): string {
  return code.replace(
    /<div data-figma-node="3047:21338" className="box-border w-\[20px\] h-\[20px\] absolute left-\[0px\] top-\[0px\] pointer-events-none" style=\{\{backgroundImage:[^}]+\}\} \/>/,
    `<svg data-figma-node="3047:21338" viewBox="0 0 20 20" preserveAspectRatio="none" aria-hidden="true" className="box-border w-[20px] h-[20px] absolute left-[0px] top-[0px] pointer-events-none overflow-visible"><defs><linearGradient id="luna-3047-21338-grad" x1="0" y1="20" x2="20" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#faad4f" /><stop offset="35%" stopColor="#dd2a7b" /><stop offset="62%" stopColor="#9537b0" /><stop offset="100%" stopColor="#515bd4" /></linearGradient></defs><path d="M10.0198 0L9.97429 0C4.46564 0 0 4.46696 0 9.97723L0 10.0228C0 15.533 4.46564 20 9.97429 20L10.0198 20C15.5285 20 19.9941 15.533 19.9941 10.0228L19.9941 9.97723C19.9941 4.46696 15.5285 0 10.0198 0Z" fill="url(#luna-3047-21338-grad)" /></svg>`,
  );
}

function fixUltimateMindVector(code: string): string {
  return code.replace(
    /<svg([^>]*data-figma-node="I3047:21447;1700:3241"[^>]*) data-figma-diagnostic="vector_geometry_unavailable"[^>]*>[\s\S]*?<\/svg>/,
    `<svg$1 viewBox="0 0 12 12" preserveAspectRatio="none" aria-hidden="true" className="box-border w-[12px] h-[12px] absolute left-[11px] top-[3px] [--fx:11] [--fww:12] pointer-events-none overflow-visible"><path d="M6 0.75L6.98 4.02L10.25 4.25L7.62 6.38L8.48 9.58L6 7.88L3.52 9.58L4.38 6.38L1.75 4.25L5.02 4.02L6 0.75Z" fill="#ffffff" stroke="#0b0b0b" strokeWidth="1" /></svg>`,
  );
}

function normalizeOwnedLayoutModule(code: string, id: string): string {
  let next = code;

  next = next.replace(
    /<span([^>]*data-figma-unrendered="vector"[^>]*)><\/span>/g,
    `<svg$1 data-figma-diagnostic="vector_geometry_unavailable" viewBox="0 0 12 12" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none overflow-visible"><path d="M0 0L12 0L12 12L0 12L0 0Z" fill="none" stroke="#828282" strokeWidth="1" /></svg>`,
  );

  next = next.replace(
    /<span([^>]*data-figma-diagnostic="vector_geometry_unavailable"[^>]*)><\/span>/g,
    `<svg$1 viewBox="0 0 12 12" preserveAspectRatio="none" aria-hidden="true" className="pointer-events-none overflow-visible"><path d="M0 0L12 0L12 12L0 12L0 0Z" fill="none" stroke="#828282" strokeWidth="1" /></svg>`,
  );

  if (id.endsWith("ContentLibraryVerticalNav.tsx")) {
    const sections = loadContentLibrarySections();
    const navRoot = findSpecSection(sections, "3047:21447");
    next = stripInventedNavGlows(next);
    if (navRoot?.height_px) {
      next = ensureSectionRootHeight(next, "3047:21447", Math.round(navRoot.height_px));
    }
    if (navRoot) {
      next = injectMissingImageStamps(next, navRoot);
    }
    next = fixUltimateMindVector(next);
  }

  if (id.endsWith("Section_n_3047_21332.tsx")) {
    next = fixInstagramReelGradientVector(next);
  }

  return next;
}

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
    transform(code, id) {
      if (!id.includes("/src/components/luna-figma/") || !id.endsWith(".tsx")) {
        return null;
      }
      const normalized = normalizeOwnedLayoutModule(code, id);
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
