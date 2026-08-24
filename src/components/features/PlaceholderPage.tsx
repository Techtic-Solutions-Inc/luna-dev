import { useEffect, useState } from 'react';
import type { AsyncStatus } from '../../types/api';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import Spinner from '../ui/Spinner';

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export default function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const [status, setStatus] = useState<AsyncStatus>('loading');

  const load = () => {
    setStatus('loading');
    setStatus('empty');
  };

  useEffect(() => {
    load();
  }, []);

  if (status === 'loading') {
    return <Spinner label={`Loading ${title}`} className="min-h-[40vh]" />;
  }

  if (status === 'error') {
    return <ErrorState onRetry={load} />;
  }

  if (status === 'empty') {
    return (
      <div className="flex flex-col gap-gap-24">
        <div>
          <h2 className="typo-heading-lg-19 text-secondary">{title}</h2>
          <p className="mt-gap-8 typo-body-15 text-color-15">{description}</p>
        </div>
        <EmptyState
          title={`${title} is ready`}
          message="This screen is wired in the routing shell. Feature content will land in a follow-up ticket."
          action={
            <Button type="button" onClick={load}>
              Refresh
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-gap-16">
      <h2 className="typo-heading-lg-19 text-secondary">{title}</h2>
      <p className="typo-body-15 text-color-15">{description}</p>
    </div>
  );
}
