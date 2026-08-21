import { useEffect, useState } from 'react';
import { fetchExampleData } from '../../lib/api/example';
import { getErrorMessage } from '../../lib/api/errors';
import type { ContentCalendarEntry } from '../../types/api';
import Spinner from '../Spinner';

const formatDate = (value: string): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(date);
};

const ContentCalendar = () => {
  const [items, setItems] = useState<ContentCalendarEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchExampleData();
        if (!response.success) {
          throw new Error(response.message);
        }
        if (!cancelled) {
          setItems(response.data.items);
        }
      } catch (err) {
        if (!cancelled) {
          setError(getErrorMessage(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading) {
    return <Spinner label="Loading calendar..." />;
  }

  if (error) {
    return (
      <p role="alert" className="text-[length:var(--typography-body-15-font-size)] text-[color:var(--color-color-51)]">
        {error}
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-[length:var(--typography-body-15-font-size)] leading-[var(--typography-body-15-line-height)] text-[color:var(--color-text-secondary)]">
        No calendar entries are available.
      </p>
    );
  }

  return (
    <ul className="grid gap-[var(--spacing-gap-16)] tablet:grid-cols-2 desktop:grid-cols-3">
      {items.map((item) => (
        <li
          key={item.id}
          className="rounded-[var(--radius-16)] border border-[color:var(--color-color-20)] bg-[color:var(--color-color-22)] p-[var(--spacing-padding-20)] shadow-[var(--effect-drop-shadow-11)]"
        >
          <p className="text-[length:var(--typography-caption-4-font-size)] leading-[var(--typography-caption-4-line-height)] text-accent">
            {formatDate(item.date)}
          </p>
          <h2 className="mt-[var(--spacing-gap-8)] font-heading text-[length:var(--typography-heading-md-57-font-size)] font-semibold leading-[var(--typography-heading-md-57-line-height)] text-secondary">
            {item.title}
          </h2>
          <p className="mt-[var(--spacing-gap-8)] text-[length:var(--typography-body-sm-24-font-size)] leading-[var(--typography-body-sm-24-line-height)] text-[color:var(--color-text-secondary)]">
            {item.description || item.content}
          </p>
          <p className="mt-[var(--spacing-gap-12)] text-[length:var(--typography-caption-7-font-size)] leading-[var(--typography-caption-7-line-height)] text-[color:var(--color-color-14)]">
            {item.full_name}
          </p>
          {item.link ? (
            <a
              href={item.link}
              className="mt-[var(--spacing-gap-12)] inline-block text-[length:var(--typography-body-sm-23-font-size)] text-accent underline"
            >
              Open link
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default ContentCalendar;
