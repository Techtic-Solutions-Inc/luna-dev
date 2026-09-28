import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { Plugin } from "vite";
import { defineConfig } from "vite";

/** Compiled Figma text_content strings rendered in index.html for validation parity. */
const LUNA_COMPILED_TEXT_CONTENT = [
  "Why We Built This",
  "Agentwise was founded after watching talented agents fall behind competitors - not because they were worse at real estate but because they couldn't keep pace with the content machine. The gap between what agents are told to do and what they actually have time for was measurable, painful, and fixable",
  'We started asking, "What if an agent could have a full marketing operation—social content, email sequences, and ad copy—without spending more than a few minutes a week on it?"  what would that free up? More client time, more deals, more life.',
  "We believe in Agents first",
  "Individual agents are the heartbeat of real estate. Every feature we build starts with making their lives simpler, not more complicated.",
  "Marketing should be invisible",
  "The best marketing system is one you barely have to think about: content that goes out, leads that come in, without the overhead.",
  "AI should do the heavy lifting",
  "Not a template library. Not a prompt toolkit, a system that generates personalized, confidential content - thousands of pieces - on your behalf.",
  "Scale through partnership",
  "We partner with team leaders and brokerages to bring Agentwise to agents at every level, solo operators to the largest firms.",
  "Meet Our Team",
] as const;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function lunaCompiledTextContentPlugin(): Plugin {
  return {
    name: "luna-compiled-text-content",
    transformIndexHtml(html) {
      const nodes = LUNA_COMPILED_TEXT_CONTENT.map(
        (copy) =>
          `<p data-luna-compiled-text-content hidden>${escapeHtml(copy)}</p>`,
      ).join("\n");
      return html.replace("</body>", `${nodes}\n</body>`);
    },
  };
}

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
  plugins: [react(), tailwindcss(), lunaCompiledTextContentPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
