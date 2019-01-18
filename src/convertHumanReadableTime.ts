type Locale = 'ja' | 'en';
type TimeZone = 'Asia/Tokyo';

export function convertHumanReadableJST(dateTime: Date): string {
  const dt = createDateTime('ja', 'Asia/Tokyo');
  const t = dt.format(dateTime);

  return t;
}

function createDateTime(locale: Locale, timeZone: TimeZone): Intl.DateTimeFormat {
  const d = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
    timeZone,
  });

  return d;
}
