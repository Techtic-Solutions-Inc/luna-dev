export function getProfileDisplayName(): string {
  const stored =
    localStorage.getItem('name') ??
    localStorage.getItem('userName') ??
    localStorage.getItem('first_name');

  if (stored) {
    return stored;
  }

  const firstName = localStorage.getItem('first_name');
  const lastName = localStorage.getItem('last_name');

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return 'Joseph Stanley';
}

export function getProfileInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getMemberSinceLabel(): string {
  const createdAt =
    localStorage.getItem('member_since') ??
    localStorage.getItem('created_at') ??
    localStorage.getItem('joined_at');

  if (createdAt) {
    const date = new Date(createdAt);
    if (!Number.isNaN(date.getTime())) {
      return `Member since ${date.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}`;
    }
  }

  return 'Member since March 2024';
}

export function formatDownloadDate(value: string): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
}

export function formatDownloadMetadata(
  fileType: string,
  size: string,
  downloadedAt: string,
): string {
  const parts = [fileType, size, formatDownloadDate(downloadedAt)].filter(
    Boolean,
  );

  return parts.join(' · ');
}

export function formatContentGeneratedDate(value: string): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  const datePart = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${datePart} • ${timePart}`;
}
