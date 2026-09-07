# my-app

React + TypeScript + Vite frontend with design tokens, API client, and authentication.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Typecheck and production build |
| `npm run typecheck` | TypeScript check only |
| `npm run lint` | ESLint + Oxlint on `src/` (see below) |
| `npm run format` | Prettier on `src/**/*.{ts,tsx}` |
| `npm run test` | Vitest unit tests |

## Linting

`npm run lint` runs **ESLint 10** (`eslint.config.js`) and **Oxlint** (`.oxlintrc.json`) on `src/`. ESLint 9+ no longer reads legacy `.eslintrc.js` / `.eslintrc.cjs` files. ESLint covers TypeScript and React Hooks rules; Oxlint covers additional React rules. Formatting is handled separately by Prettier (`npm run format`).

## Environment

Copy `.env.example` to `.env` and set `VITE_API_URL` (default `http://localhost:4040`).
