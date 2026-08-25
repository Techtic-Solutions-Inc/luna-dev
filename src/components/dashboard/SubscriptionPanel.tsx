import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";

interface SubscriptionPanelProps {
  used?: number;
  total?: number;
  status?: string;
  onManage?: () => void;
  managing?: boolean;
  error?: string | null;
}

export function SubscriptionPanel({ used, total, status, onManage, managing, error }: SubscriptionPanelProps) {
  if (used === undefined && total === undefined && !status) {
    return <EmptyState title="No Content Available" detail="Subscription details are not available." />;
  }

  return (
    <div className="rounded-16 border border-color-129 bg-color-106 p-24">
      {status ? <p className="text-almarai-16-20 text-color-131">Status: {status}</p> : null}
      {used !== undefined && total !== undefined ? (
        <p className="mt-8 font-garamond text-hero-serif text-accent">
          {used.toLocaleString()} / {total.toLocaleString()}
        </p>
      ) : null}
      {error ? <p className="mt-12 text-almarai-14 text-border">{error}</p> : null}
      {onManage ? (
        <Button className="mt-20 h-44" onClick={onManage} loading={managing}>
          Manage subscription
        </Button>
      ) : null}
    </div>
  );
}
