import { IconDemo } from "@/components/ui/IconDemo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export function DemoProtectedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-eb-garamond text-3xl text-foreground">Protected Demo</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Authenticated shell for JAW-9705 verification. Marketing home remains at{" "}
          <code className="text-foreground">/</code>.
        </p>
      </div>
      <IconDemo />
      <div className="flex max-w-xs flex-col gap-2">
        <span className="text-xs text-muted-foreground">Toolbar filter (Select)</span>
        <Select defaultValue="all">
          <SelectTrigger size="sm" aria-label="Filter role">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="agent">Agent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Skeleton className="h-4 w-48" aria-hidden="true" />
    </div>
  );
}
