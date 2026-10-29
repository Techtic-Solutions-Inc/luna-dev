import type { ReactNode } from "react";

/** Shared page shell for routed Luna screens (JAW-9705 deliverable). */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full min-w-0 flex-col bg-background text-text-primary">
      {children}
    </div>
  );
}
