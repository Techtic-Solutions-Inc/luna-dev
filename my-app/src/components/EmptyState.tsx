import type { LucideIcon } from 'lucide-react'
import { Inbox } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#3a3541]/50">
        <Icon className="h-7 w-7 text-[#828282]" aria-hidden="true" />
      </div>
      <div className="space-y-2">
        <h3 className="text-[18px] font-[600] text-[#ffffff]">{title}</h3>
        {description && <p className="max-w-sm text-[16px] text-[#828282]">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} type="button">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
