# Agentwise

Real estate marketing platform — React + TypeScript + Vite + Tailwind.

## Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 3
- react-router-dom
- axios

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Set `VITE_API_BASE_URL` in `.env` (default: `http://localhost:4040`).

## Routes

| Route | Page |
|---|---|
| `/` | Home (public) |
| `/signup` | Sign Up (public) |
| `/signin` | Sign In (public) |
| `/forgot-password` | Forgot Password (public) |
| `/dashboard` | Dashboard (authenticated) |

## Scripts

- `npm run dev` — start dev server
- `npm run build` — typecheck + production build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## API

The client reads `VITE_API_BASE_URL` and calls:

- `GET /api/visitor/home`
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/dashboard` (Bearer token)
