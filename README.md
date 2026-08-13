# luna-dev

Frontend workspace for Luna agent runs.

## Stack

- React + TypeScript
- Vite
- React Router

## Getting started

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — start the Vite development server
- `npm run typecheck` — TypeScript project references check
- `npm run lint` — oxlint
- `npm run build` — typecheck and production build

## Environment

Copy `.env.example` to `.env` and set the API base URL when the backend is not
proxied through Vite:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000
```

The Sign Up screen posts to `POST /api/signup`.
