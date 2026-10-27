import js from "@eslint/js";

/** TypeScript sources are checked via `npm run typecheck` (TS 7.x). ESLint covers config files. */
export default [
  js.configs.recommended,
  {
    files: ["*.{js,mjs,cjs}", "vite.config.ts", "vitest.config.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
      },
    },
  },
];
