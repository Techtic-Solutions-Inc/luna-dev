# luna-dev

Frontend workspace for Luna agent runs — Agentwise marketing platform.

## Stack

- React 19 + TypeScript (strict mode)
- Vite 6
- react-router-dom
- axios
- styled-components
- react-icons

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_URL` in `.env` to your API base URL (default: `http://localhost:8001`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test` | Jest |

## Project structure

```
src/
  main.tsx              # Entry point
  App.tsx               # Root component with ErrorBoundary
  routes/               # react-router-dom routes
  components/
    layout/             # AppShell, Header, Sidebar, ProtectedRoute, ErrorBoundary
    ui/                 # Spinner and shared UI
    features/           # Page-level components
  lib/api/              # Axios client with auth interceptor
  theme/                # Design tokens, breakpoints, Theme provider
  hooks/ stores/ types/ assets/
tests/
```

## Design tokens

All Sofia Figma tokens are mapped in `src/theme/tokens.ts` and exposed as CSS variables via the Theme provider in `src/theme/index.ts`.
