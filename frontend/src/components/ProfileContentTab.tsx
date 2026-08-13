import { useState } from 'react';
import {
  FontAwesomeIcon,
  faChevronLeft,
  faChevronRight,
} from '../theme/icons';
import type { ContentHistoryItem } from '../types/api';
import './ProfileHistory.css';

const CONTENT_ITEMS: ContentHistoryItem[] = [
  {
    id: '1',
    title: 'Just Listed — 12 Maple Ridge',
    preview:
      'A warm welcome to this stunning colonial in Maple Ridge with updated kitchen and sun-filled living spaces.',
    date: 'Jun 05, 2026',
    time: '9:42 AM',
  },
  {
    id: '2',
    title: 'Spring Market Snapshot',
    preview:
      'Inventory is up 8% this quarter. Here is what buyers and sellers need to know before making their next move.',
    date: 'Jun 03, 2026',
    time: '2:15 PM',
  },
  {
    id: '3',
    title: 'Open House Weekend Reel',
    preview:
      'Three reasons to visit 1200 Pennsylvania Avenue this Saturday — from the chef kitchen to the rooftop terrace.',
    date: 'May 31, 2026',
    time: '11:08 AM',
  },
  {
    id: '4',
    title: 'Neighborhood Spotlight — Georgetown',
    preview:
      'Historic charm meets modern convenience in one of DC’s most walkable neighborhoods. See my top five picks.',
    date: 'May 27, 2026',
    time: '4:55 PM',
  },
  {
    id: '5',
    title: 'Buyer Consultation Follow-Up',
    preview:
      'Thanks for meeting today. Here is a curated list of homes that match your criteria and budget in Arlington.',
    date: 'May 22, 2026',
    time: '10:30 AM',
  },
];

const PAGE_SIZE = 5;
const TOTAL = 247;

export function ProfileContentTab() {
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const visibleItems = CONTENT_ITEMS.slice(0, PAGE_SIZE);
  const showingStart = start + 1;
  const showingEnd = Math.min(start + PAGE_SIZE, TOTAL);

  return (
    <section className="profile-history" aria-labelledby="content-history-heading">
      <header className="profile-history__header">
        <h2 id="content-history-heading" className="profile-history__title">
          Content History
        </h2>
        <p className="profile-history__count" aria-label="247 total content items">
          247
        </p>
      </header>

      <ul className="profile-history__list">
        {visibleItems.map((item) => (
          <li key={item.id} className="profile-history__item profile-history__item--content">
            <div className="profile-history__item-body">
              <p className="profile-history__item-title">{item.title}</p>
              <p className="profile-history__item-preview">{item.preview}</p>
              <p className="profile-history__item-meta">
                {item.date} · {item.time}
              </p>
            </div>

            <button type="button" className="profile-history__view">
              View
            </button>
          </li>
        ))}
      </ul>

      <footer className="profile-history__footer">
        <p className="profile-history__pagination-label">
          Showing {showingStart}–{showingEnd} of {TOTAL}
        </p>
        <div className="profile-history__pagination-controls">
          <button
            type="button"
            className="profile-history__page-btn"
            aria-label="Previous page"
            disabled={page === 0}
            onClick={() => {
              setPage((current) => Math.max(0, current - 1));
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button
            type="button"
            className="profile-history__page-btn"
            aria-label="Next page"
            disabled={showingEnd >= TOTAL}
            onClick={() => {
              setPage((current) => current + 1);
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </footer>
    </section>
  );
}

export default ProfileContentTab;
