import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function MarketingStubPage({ title }: { title: string }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <h1 className="font-eb-garamond text-4xl capitalize text-foreground">{title}</h1>
      <p className="max-w-lg text-sm text-muted-foreground">
        This page will be built in a follow-up ticket. You arrived from{" "}
        <span className="text-foreground">{location.pathname}</span>.
      </p>
      <Button asChild variant="outline">
        <Link to="/">Back to Home</Link>
      </Button>
    </div>
  );
}
