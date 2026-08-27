import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { PageHeader } from '@/components/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { colors, radius, spacing, typography } from '@/theme/tokens';
import { getApiBaseUrl } from '@/lib/api/client';

const checks = [
  { name: 'Vite + TypeScript', status: 'Ready' },
  { name: 'React Router', status: 'Ready' },
  { name: 'Axios client', status: 'Ready' },
  { name: 'Auth gate', status: 'Ready' },
  { name: 'Sofia tokens', status: `${Object.keys(colors).length} colors` },
];

export default function Home() {
  const heading = typography['heading-lg-19'];

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 bg-background px-4 py-8 md:px-8">
      <PageHeader
        title="Welcome to Agentwise"
        description="Project foundation for the Agentwise membership platform: routing, API client, auth gate, and the Sofia design-token system."
        action={
          <Button asChild variant="outline">
            <Link to="/app">Open workspace</Link>
          </Button>
        }
      />

      <section aria-labelledby="icon-heading" className="flex items-center gap-3">
        <span
          aria-label="Demo icon"
          className="inline-flex items-center gap-2 text-[var(--accent)]"
        >
          <FontAwesomeIcon icon={faCoffee} aria-hidden />
          <span className="text-sm text-muted-foreground">Font Awesome is loaded</span>
        </span>
      </section>

      <section aria-labelledby="status-heading" className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle id="status-heading">Runtime checks</CardTitle>
            <CardDescription>Scaffold pieces required by JAW-9705.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Capability</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checks.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Badge variant="success">{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API client</CardTitle>
            <CardDescription>
              Base URL from env. Typed <code>POST /auth/login</code> is exported and is not called
              on this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              Host:{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">
                {getApiBaseUrl()}
              </code>
            </p>
            <p>
              Unauthenticated visits to /app redirect home. Set a session token to open the
              workspace.
            </p>
            <div
              aria-labelledby="loading-preview-label"
              className="flex items-center gap-3 rounded-md border border-border p-3"
            >
              <LoadingSpinner />
              <p id="loading-preview-label" className="text-sm text-foreground">
                Loading indicator preview
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="tokens-heading">
        <h2
          id="tokens-heading"
          className="mb-3 text-lg font-semibold"
          style={{ fontFamily: heading.fontFamily }}
        >
          Design tokens
        </h2>
        <div className="flex flex-wrap gap-2">
          {(['accent', 'text-primary', 'text-secondary', 'color-16', 'color-21'] as const).map(
            (name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                style={{ borderRadius: radius['radius-8'] }}
              >
                <span
                  className="h-5 w-5 rounded-sm border border-border"
                  style={{ background: colors[name], padding: spacing['padding-0'] }}
                  aria-hidden
                />
                <span>
                  {name} {colors[name]}
                </span>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}
