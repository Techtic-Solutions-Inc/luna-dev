const CALENDAR_GRADIENTS = [
  'linear-gradient(160deg, #2f271f 0%, #1a1919 60%, #473e33 100%)',
  'linear-gradient(160deg, #1c1916 0%, #376292 50%, #1a1919 100%)',
  'linear-gradient(160deg, #473e33 0%, #1d3d33 50%, #14100d 100%)',
  'linear-gradient(160deg, #2f271f 0%, #6c5082 40%, #1a1919 100%)',
  'linear-gradient(160deg, #1c101d 0%, #2f271f 60%, #473e33 100%)',
] as const;

export const getCalendarGradient = (index: number): string =>
  CALENDAR_GRADIENTS[index % CALENDAR_GRADIENTS.length];

export const inferContentType = (title: string, description: string): string => {
  const combined = `${title} ${description}`.toLowerCase();
  if (combined.includes('reel')) return 'Reels';
  if (combined.includes('story')) return 'Story';
  if (combined.includes('email')) return 'Email';
  if (combined.includes('post')) return 'Post';
  return 'Content';
};
