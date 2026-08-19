import type { ContentCalendarEntry } from '../../../types/contentCalendar';

export function inferContentType(entry: ContentCalendarEntry): string {
  const text = `${entry.title} ${entry.content} ${entry.description}`.toLowerCase();
  if (text.includes('reel')) return 'Reels';
  if (text.includes('story')) return 'Story';
  if (text.includes('email')) return 'Email';
  return '';
}

export function formatEntryDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';
  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate().toString().padStart(2, '0');
  return `${month} ${day}`;
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}
