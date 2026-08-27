# Agentwise

React + TypeScript + Vite frontend for the Agentwise platform.

## Getting started

```bash
npm install
npm run dev
```

Requires **Node 20+** (`@fortawesome/react-fontawesome` 3.5.x).

API host is read from `VITE_API_URL` or `VITE_API_BASE_URL` (see `.env.example`). Default: `http://localhost:4040`.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — typecheck and production bundle
- `npm run lint` — ESLint + Prettier
- `npm test` — Vitest

## Layout

Source lives at the repository root (`src/`), not under `app/` or `frontend/`.
