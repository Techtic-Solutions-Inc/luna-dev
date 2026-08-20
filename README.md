# Agentwise Frontend

Marketing site and signed-in studio for Agentwise, the real estate marketing platform.

## Stack

- React 19 + TypeScript (strict) on Vite 6
- React Router 7 for routing
- Tailwind CSS 3, generated from the Figma design tokens in `src/theme/tokens.ts`
- Axios for HTTP, with a bearer-token interceptor
- `react-icons` for iconography, `@fontsource` for self-hosted typefaces

## Getting started

```bash
npm install
cp .env.example .env   # then point VITE_API_BASE_URL at your API
npm run dev
```

## Scripts

| Script                 | Purpose                                     |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Start the Vite dev server on port 5173      |
| `npm run build`        | Typecheck, then build to `dist/`            |
| `npm run preview`      | Serve the production build                  |
| `npm run typecheck`    | `tsc --noEmit` for app and node configs     |
| `npm run lint`         | ESLint (includes Prettier formatting rules) |
| `npm run format`       | Rewrite files with Prettier                 |
| `npm run format:check` | Verify formatting without writing           |

## Folder structure

```
index.html
vite.config.ts        tailwind.config.ts      eslint.config.js
src/
  main.tsx            React entry: ErrorBoundary > ThemeProvider > App
  App.tsx             Renders the router
  routes/             Routing shell (code-split screens)
  components/
    ui/               Primitives (Spinner, Logo)
    layout/           AppShell, Header, Sidebar, SiteHeader, ProtectedRoute, ErrorBoundary
    features/         Screens (Home, NotFound)
  hooks/              Shared React hooks
  lib/
    api/client.ts     Axios instance + normalised ApiError
    auth/token.ts     Bearer token storage
    utils/            Small helpers
  stores/             Client state
  theme/              Design tokens, breakpoints, ThemeProvider
  types/              Shared API types
  styles/             Tailwind entry, global reset, font imports
  assets/             Static imports
tests/                Test suites
public/               Files served as-is
```

## Design tokens

`src/theme/tokens.ts` holds every Figma token: 95 colours, 119 typography styles,
the spacing, radius and effect scales, and the font stacks. Everything else is
derived from it, so a token change propagates everywhere:

- **Tailwind** reads it in `tailwind.config.ts`. Colours become utilities
  (`bg-accent`, `text-color-14`), spacing is pixel-exact (`p-20` is 20px, the
  same number as in Figma), radii are keyed by value (`rounded-10`), and each
  typography token becomes a single utility that sets family, size, weight,
  line-height and letter-spacing together (`type-heading-xl-46`).
- **CSS custom properties** are published on `:root` by `ThemeProvider`
  (`--accent`, `--radius-10`, `--drop-shadow-40`, `--breakpoint-tablet`, ...).
- **TypeScript** consumers can read the same values through `useTheme()`.

Breakpoints live in `src/theme/breakpoints.ts` and drive the `mobile:`,
`tablet:` and `desktop:` Tailwind variants (480 / 768 / 1024px).

## API access

`src/lib/api/client.ts` exports an axios instance whose base URL comes from
`VITE_API_BASE_URL`. Endpoints are mounted on the API root, so paths are written
without an `/api` prefix:

```ts
import { apiClient } from '@/lib/api/client';
import type { ApiResponse } from '@/types/api';

const { data } = await apiClient.get<ApiResponse<DashboardOverview>>('/dashboard');
```

A request interceptor attaches `Authorization: Bearer <token>` when a token is
stored, and a response interceptor rejects with a typed `ApiError`
(`message`, `status`, `fieldErrors`), clearing the token on `401`.

## Adding a protected screen

Wrap the route in `ProtectedRoute` and render it inside `AppShell`:

```tsx
<Route
  element={
    <ProtectedRoute>
      <AppShell />
    </ProtectedRoute>
  }
>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>
```

`ProtectedRoute` redirects visitors without a stored token and forwards the
attempted path in location state. `AppShell` provides the sidebar navigation, the
mobile drawer with its top bar, a skip link and the `<main>` landmark.
