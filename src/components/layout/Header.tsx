import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-color-27 px-6">
      <Link to="/" className="font-eb-garamond text-lg text-foreground">
        Agentwise
      </Link>
      <nav aria-label="App" className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/login">Log In</Link>
        </Button>
      </nav>
    </header>
  );
}
