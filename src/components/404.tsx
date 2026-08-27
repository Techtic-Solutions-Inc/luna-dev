import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { typography } from '@/theme/tokens';

const NotFound = () => (
  <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-6 text-center">
    <h1
      style={{
        fontFamily: typography['heading-lg-19'].fontFamily,
        fontSize: typography['heading-lg-19'].fontSize,
        fontWeight: typography['heading-lg-19'].fontWeight,
        lineHeight: typography['heading-lg-19'].lineHeight,
      }}
    >
      404 - Page Not Found
    </h1>
    <p className="text-muted-foreground">That route is not registered in this application.</p>
    <Button asChild>
      <Link to="/">Go to home</Link>
    </Button>
  </main>
);

export default NotFound;
