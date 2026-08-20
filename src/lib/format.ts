export const formatDisplayDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};

export const formatDayLabel = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString.slice(0, 3).toUpperCase();
  }
  return date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const getFirstName = (fullName: string): string =>
  fullName.trim().split(/\s+/)[0] ?? fullName;
