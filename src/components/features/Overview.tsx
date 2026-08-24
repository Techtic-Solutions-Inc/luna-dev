import { useEffect, useState } from 'react';
import type { AsyncStatus } from '../../types/api';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';

export default function Overview() {
  const [status, setStatus] = useState<AsyncStatus>('loading');
  const [showSample, setShowSample] = useState(false);

  const load = (withSample = false) => {
    setStatus('loading');
    setShowSample(withSample);
    setStatus(withSample ? 'success' : 'empty');
  };

  useEffect(() => {
    load(false);
  }, []);

  if (status === 'loading') {
    return <Spinner label="Loading overview" className="min-h-[40vh]" />;
  }

  if (status === 'error') {
    return <ErrorState onRetry={() => load(false)} />;
  }

  if (status === 'empty') {
    return (
      <div className="flex flex-col gap-gap-24">
        <div>
          <h2 className="typo-heading-lg-19 text-secondary">Overview</h2>
          <p className="mt-gap-8 typo-body-15 text-color-15">
            Platform updates, generated content and studio activity will appear here.
          </p>
        </div>
        <EmptyState
          title="No content generated"
          message="Your studio is ready. Generated posts will show up in this space."
          action={
            <Button type="button" onClick={() => load(true)}>
              Load sample data
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-gap-16">
      <div>
        <h2 className="typo-heading-lg-19 text-secondary">Overview</h2>
        <p className="mt-gap-8 typo-body-15 text-color-15">
          {showSample ? 'Sample studio data loaded successfully.' : 'Studio activity is available.'}
        </p>
      </div>
      <div className="rounded-radius-16 border border-color-26 bg-color-89 p-padding-24 typo-body-15 text-color-15">
        Recent content generation is ready for the next feature tickets.
      </div>
      <Button type="button" onClick={() => load(false)}>
        Refresh
      </Button>
    </div>
  );
}
