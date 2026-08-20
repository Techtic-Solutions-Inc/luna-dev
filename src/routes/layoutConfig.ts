/**
 * Route layout assignments (see src/routes/index.tsx).
 * JAW-9188: forgot-password uses AppShell dashboard chrome, not AuthLayout.
 */
export const ROUTE_LAYOUT = {
  home: 'none',
  signIn: 'AuthLayout',
  signUp: 'AuthLayout',
  forgotPassword: 'AppShell',
  verifyEmail: 'EmailDesignLayout',
  dashboard: 'AppShell',
} as const;

export type RouteLayoutName = (typeof ROUTE_LAYOUT)[keyof typeof ROUTE_LAYOUT];
