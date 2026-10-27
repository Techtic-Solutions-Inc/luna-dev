import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-eb-garamond text-4xl text-foreground">404 — Page Not Found</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        The page you requested is not available.
      </p>
      <Button asChild>
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
