# Agentwise

React + TypeScript + Vite frontend for the Agentwise membership platform.

## Getting started

```bash
npm install
npm run dev
```

API base URL is `VITE_API_BASE_URL` (see `.env.example`). Default: `http://localhost:4040`.

## Scripts

- `npm run dev` — Vite dev server
- `npm run build` — typecheck + production build
- `npm run preview` — preview production build
- `npm run lint` — ESLint
- `npm run typecheck` — `tsc --noEmit`

## Routes

- `/` — visitor entry
- `/sign-up` — create an account (`POST /api/signup`)
- `/sign-in` — sign in (`POST /api/auth/login`)
- `/forgot-password` — password recovery placeholder
- `/dashboard` — signed-in home (`GET /api/auth/logout` from Sign out)
