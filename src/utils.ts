export const extractIdFromUrl = (url: string): string | null => {
  if (!url) return null;
  const parts = url.split('/');
  return parts.pop() || null;
};
