# Agentwise Frontend

Production-ready React frontend shell for the Agentwise real estate marketing platform.

## Stack

- React 19 + TypeScript (strict)
- Vite 6
- React Router 7
- Axios API client
- styled-components theme + Tailwind CSS utilities
- Font Awesome icons
- Vitest + Testing Library

## Getting started

```bash
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Use **Demo sign in** on the home page to access the protected `/app` studio shell (Overview, Content Library, Calendar, Ultimate Mind, Announcements, Features, Subscription).

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start Vite dev server        |
| `npm run build`     | Typecheck + production build |
| `npm run preview`   | Preview production build     |
| `npm run typecheck` | TypeScript check only        |
| `npm run lint`      | ESLint                       |
| `npm run format`    | Prettier write               |
| `npm run test`      | Vitest unit tests            |

## Project structure

```
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── features/      # Route-level screens
│   │   ├── layout/        # AppShell, Header, Sidebar, ProtectedRoute
│   │   ├── tests/
│   │   └── ui/            # Shared UI primitives
│   ├── hooks/             # useAuth
│   ├── lib/api/           # Axios client + auth/login
│   ├── routes/            # Router shell
│   ├── theme/             # Figma tokens, breakpoints, ThemeProvider
│   └── types/
└── tests/
```

## Environment

```env
VITE_API_URL=http://localhost:8000/api
```

Ticket endpoints are relative paths. Full URL = `{VITE_API_URL}{endpoint_path}`.

## Design tokens

All Figma colors, typography, spacing, radii, shadows and gradients are defined once in `src/theme/tokens.ts` and exposed through:

- CSS variables via `AppThemeProvider` / `GlobalStyle`
- Tailwind theme extensions in `tailwind.config.ts`
- Typography utility classes (`.typo-*`)

Use token class names (e.g. `text-accent`, `p-padding-24`, `rounded-radius-16`) instead of ad-hoc values.

## Auth

- Token storage: `localStorage` key `token`
- Protected routes wrap `AppShell` at `/app`
- API client attaches `Authorization: Bearer {token}` when present
- Login endpoint: `POST /auth/login`
