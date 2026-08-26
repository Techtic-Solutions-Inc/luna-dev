import { EmptyState } from '@/components/ui/EmptyState';

export function NewFeaturesPanel() {
  return (
    <section id="new-features" aria-labelledby="new-features-heading">
      <h2
        id="new-features-heading"
        className="mb-4 text-[24px] font-medium leading-8 text-ink"
      >
        New Features
      </h2>
      <EmptyState title="No content available" />
    </section>
  );
}
