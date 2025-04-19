import dayjs from 'dayjs';

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'No date';
  return dayjs(dateString).format('DD-MM-YYYY');
}