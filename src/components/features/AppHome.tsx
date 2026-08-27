import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { colors, spacing, typography } from '@/theme/tokens';

export default function AppHome() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="App"
        description="Authenticated workspace shell. Feature screens will mount here through the AppShell outlet."
      />
      <Card>
        <CardHeader>
          <CardTitle>Session</CardTitle>
          <CardDescription>
            A token is present in local storage, so the auth gate allowed this route.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p style={{ fontFamily: typography.body.fontFamily, fontSize: typography.body.fontSize }}>
            Token key: <code className="text-foreground">token</code>
          </p>
          <p>
            Color tokens loaded:{' '}
            <strong className="text-foreground">{Object.keys(colors).length}</strong>
          </p>
          <p style={{ marginTop: spacing['padding-8'] }}>
            Use the header Sign out control to clear the session and return to the public home
            route.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
