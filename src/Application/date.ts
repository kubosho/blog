import { DateTime } from 'luxon';

export function parseISOFormat(dateISOString: string): DateTime {
  const dt = DateTime.fromISO(dateISOString);
  return dt;
}

export function formatYYMMDDString(dateTime: DateTime): string {
  const dt = dateTime.toFormat('yyyy/MM/dd');
  return dt;
}
