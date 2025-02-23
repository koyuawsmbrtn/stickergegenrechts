export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}