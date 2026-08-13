import { useState } from 'react';
import {
  FontAwesomeIcon,
  faChevronLeft,
  faChevronRight,
  faDownload,
  faFileLines,
} from '../theme/icons';
import type { DownloadHistoryItem } from '../types/api';
import './ProfileHistory.css';

const DOWNLOAD_ITEMS: DownloadHistoryItem[] = [
  {
    id: '1',
    title: 'Luxury Listing Guide — 2026',
    category: 'Guides',
    size: '4.2 MB',
    date: 'Jun 04, 2026',
  },
  {
    id: '2',
    title: 'Spring Market Snapshot',
    category: 'Reports',
    size: '2.8 MB',
    date: 'Jun 02, 2026',
  },
  {
    id: '3',
    title: 'Open House Flyer — Maple Ridge',
    category: 'Templates',
    size: '1.6 MB',
    date: 'May 29, 2026',
  },
  {
    id: '4',
    title: 'Buyer Consultation Deck',
    category: 'Presentations',
    size: '6.1 MB',
    date: 'May 24, 2026',
  },
  {
    id: '5',
    title: 'Neighborhood Spotlight — Georgetown',
    category: 'Guides',
    size: '3.4 MB',
    date: 'May 18, 2026',
  },
];

const PAGE_SIZE = 5;
const TOTAL = 312;

export function ProfileDownloadsTab() {
  const [page, setPage] = useState(0);
  const start = page * PAGE_SIZE;
  const visibleItems = DOWNLOAD_ITEMS.slice(0, PAGE_SIZE);
  const showingStart = start + 1;
  const showingEnd = Math.min(start + PAGE_SIZE, TOTAL);

  return (
    <section className="profile-history" aria-labelledby="download-history-heading">
      <header className="profile-history__header">
        <h2 id="download-history-heading" className="profile-history__title">
          Download History
        </h2>
        <p className="profile-history__count" aria-label="312 total downloads">
          312
        </p>
      </header>

      <ul className="profile-history__list">
        {visibleItems.map((item) => (
          <li key={item.id} className="profile-history__item">
            <div className="profile-history__item-icon" aria-hidden="true">
              <FontAwesomeIcon icon={faFileLines} />
            </div>

            <div className="profile-history__item-body">
              <p className="profile-history__item-title">{item.title}</p>
              <p className="profile-history__item-meta">
                {item.category} · {item.size} · {item.date}
              </p>
            </div>

            <button type="button" className="profile-history__action">
              <FontAwesomeIcon icon={faDownload} />
              Re-download
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

export default ProfileDownloadsTab;
