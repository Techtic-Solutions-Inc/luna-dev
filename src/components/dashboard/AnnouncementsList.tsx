import { EmptyState } from "@/components/ui/EmptyState";

export interface AnnouncementRow {
  id?: string;
  title: string;
  detail?: string;
  when?: string;
}

interface AnnouncementsListProps {
  items: AnnouncementRow[];
  onDismiss?: (id: string) => void;
}

export function AnnouncementsList({ items, onDismiss }: AnnouncementsListProps) {
  if (items.length === 0) {
    return <EmptyState title="No Content Available" detail="There are no announcements right now." />;
  }

  return (
    <ul className="flex flex-col gap-10">
      {items.map((item, index) => (
        <li
          key={item.id ?? `${item.title}-${index}`}
          className="flex items-center justify-between gap-12 rounded-12 border border-color-129 bg-color-107 px-16 py-14"
        >
          <p className="text-almarai-16-20 text-secondary">{item.title}</p>
          <div className="flex shrink-0 items-center gap-12">
            {item.when ? <span className="text-almarai-14 text-color-131">{item.when}</span> : null}
            {item.id && onDismiss ? (
              <button
                type="button"
                className="text-almarai-14 text-color-131 hover:text-accent"
                onClick={() => onDismiss(item.id ?? "")}
                aria-label={`Dismiss ${item.title}`}
              >
                Dismiss
              </button>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
