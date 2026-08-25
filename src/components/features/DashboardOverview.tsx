import { useEffect, useState } from 'react';
import { fetchData } from '../../lib/api/client';
import type { ContentCalendarListResponse } from '../../types/api';

type LoadState = 'loading' | 'success' | 'error' | 'empty';

const DashboardOverview = () => {
  const [state, setState] = useState<LoadState>('loading');
  const [items, setItems] = useState<ContentCalendarListResponse['data']['items']>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadCalendar = async () => {
      setState('loading');
      try {
        const response =
          await fetchData<ContentCalendarListResponse>('/content-calendar');
        if (cancelled) return;

        if (response.data.items.length === 0) {
          setState('empty');
          setItems([]);
        } else {
          setState('success');
          setItems(response.data.items);
        }
      } catch (error) {
        if (cancelled) return;
        setState('error');
        setErrorMessage(
          error instanceof Error ? error.message : 'Unable to load content calendar.',
        );
      }
    };

    void loadCalendar();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="px-padding-24 py-padding-40 tablet:px-padding-40 desktop:px-padding-60">
      <h1 className="font-garamond text-[36px] font-semibold leading-[46.98px] text-secondary">
        Studio Overview
      </h1>
      <p className="mt-gap-12 max-w-2xl font-almarai text-base leading-[26px] text-color-15">
        Your personal content calendar designed to grow your business — made specifically
        for you.
      </p>

      <div className="mt-gap-40">
        {state === 'loading' && (
          <p
            className="font-almarai text-base leading-[26px] text-color-15"
            role="status"
            aria-live="polite"
          >
            Loading content calendar…
          </p>
        )}

        {state === 'error' && (
          <div
            className="rounded-radius-16 border border-color-118/30 bg-color-121/30 p-padding-24"
            role="alert"
          >
            <p className="font-almarai text-base leading-[26px] text-secondary">
              {errorMessage}
            </p>
          </div>
        )}

        {state === 'empty' && (
          <div className="rounded-radius-16 border border-color-129 bg-color-89 p-padding-24">
            <p className="font-almarai text-base leading-[26px] text-color-15">
              No calendar entries yet. Check back soon for scheduled content.
            </p>
          </div>
        )}

        {state === 'success' && (
          <ul className="grid gap-gap-16 tablet:grid-cols-2 desktop:grid-cols-3">
            {items.map((item) => (
              <li
                key={item.id}
                className="rounded-radius-16 border border-color-129 bg-color-41 p-padding-20 text-color-16 shadow-drop-shadow-13"
              >
                <p className="font-almarai text-sm font-bold leading-[18px]">
                  {item.title}
                </p>
                <p className="mt-gap-8 font-almarai text-xs leading-[18px] text-color-57">
                  {item.date}
                </p>
                <p className="mt-gap-12 font-almarai text-sm leading-[22px] text-color-19">
                  {item.description || item.content}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-gap-40">
        <img
          src="/images/updated-dashboard.png"
          alt="Agentwise updated dashboard preview"
          className="w-full max-w-[900px] rounded-radius-16 shadow-drop-shadow-39"
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
