import { useLogout } from "@/hooks/useLogout";
import type { ReactNode } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const studio: NavItem[] = [
  { href: "#overview", label: "Overview", icon: "home" },
  { href: "#content-library", label: "Content Library", icon: "book" },
  { href: "#content-calendar", label: "Content Calendar", icon: "cal" },
];

const tools: NavItem[] = [{ href: "#ultimate-mind", label: "Ultimate Mind", icon: "spark" }];

const account: NavItem[] = [
  { href: "#announcements", label: "Announcements", icon: "mega" },
  { href: "#new-features", label: "New Features", icon: "star" },
  { href: "#subscription", label: "Subscription", icon: "crown" },
];

interface DashboardSidebarNavProps {
  active?: string;
  onNavigate?: () => void;
  children?: ReactNode;
}

export function DashboardSidebarNav({ active = "#overview", onNavigate, children }: DashboardSidebarNavProps) {
  const { submit, loading } = useLogout();

  return (
    <nav className="flex h-full flex-col" aria-label="Dashboard">
      <p className="text-nav-label uppercase text-color-135">Studio</p>
      <ul className="mt-8 flex flex-col gap-4">
        {studio.map((item) => (
          <li key={item.href}>
            <NavRow item={item} active={active} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <p className="mt-24 text-nav-label uppercase text-color-135">Tools</p>
      <ul className="mt-8 flex flex-col gap-4">
        {tools.map((item) => (
          <li key={item.href}>
            <NavRow item={item} active={active} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <p className="mt-24 text-nav-label uppercase text-color-135">Account</p>
      <ul className="mt-8 flex flex-col gap-4">
        {account.map((item) => (
          <li key={item.href}>
            <NavRow item={item} active={active} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <div className="mt-auto">{children}</div>
      <button
        type="button"
        onClick={() => void submit()}
        disabled={loading}
        className="flex items-center gap-10 py-16 text-almarai-16-20 text-color-131 hover:text-accent disabled:opacity-50"
      >
        <span aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M10 7V5a2 2 0 0 1 2-2h7v18h-7a2 2 0 0 1-2-2v-2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 12h12M12 8l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
        Logout
      </button>
    </nav>
  );
}

function NavRow({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: string;
  onNavigate?: () => void;
}) {
  const isActive = active === item.href;
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={`flex items-center gap-10 rounded-12 px-12 py-10 text-almarai-16-20 transition hover:bg-color-129 hover:text-secondary ${
        isActive ? "bg-color-133 text-secondary" : "text-color-131"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <NavIcon name={item.icon} />
      {item.label}
    </a>
  );
}

function NavIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" as const };
  if (name === "home") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 10.5 12 4l8 6.5V20H4V10.5Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "book") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M5 5h11a3 3 0 0 1 3 3v11H8a3 3 0 0 0-3 3V5Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "cal") {
    return (
      <svg {...common} aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "mega") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 10v4h3l8 4V6L7 10H4Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "star") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M12 3l2 6h6l-5 4 2 7-5-4-5 4 2-7-5-4h6l2-6Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (name === "crown") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M4 16 6 8l6 4 6-4 2 8H4Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
