import { Badge, type BadgeProps } from '@/components/ui/badge';

type Status = 'success' | 'warning' | 'error' | 'info' | 'neutral';

const statusVariant: Record<Status, BadgeProps['variant']> = {
  success: 'success',
  warning: 'warning',
  error: 'destructive',
  info: 'default',
  neutral: 'secondary',
};

interface StatusBadgeProps {
  status: Status;
  label: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return <Badge variant={statusVariant[status]}>{label}</Badge>;
}
