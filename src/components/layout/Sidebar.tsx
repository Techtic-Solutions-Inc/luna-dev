import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [{ to: "/demo-protected", label: "Demo Protected" }];

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-color-27 md:block">
      <nav aria-label="Sidebar" className="flex flex-col gap-1 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              cn(
                "rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "bg-muted/60",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
