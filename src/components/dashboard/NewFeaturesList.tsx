import { EmptyState } from "@/components/ui/EmptyState";

export interface FeatureRow {
  id?: string;
  title: string;
  description?: string;
}

export function NewFeaturesList({ items }: { items: FeatureRow[] }) {
  if (items.length === 0) {
    return <EmptyState title="No Content Available" detail="No new features to show." />;
  }

  return (
    <ul className="flex flex-col gap-10">
      {items.map((item, index) => (
        <li key={item.id ?? `${item.title}-${index}`} className="rounded-12 border border-color-129 bg-color-107 px-16 py-14">
          <p className="text-almarai-16-bold text-secondary">{item.title}</p>
          {item.description ? <p className="mt-8 text-almarai-16-20 text-color-131">{item.description}</p> : null}
        </li>
      ))}
    </ul>
  );
}
