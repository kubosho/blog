import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../Application/constants';
import { ENTRY_PATH } from '../Application/paths';
import { EntryValue } from '../Entry/entryValue';

export type RSSObject = {
  channel: {
    title: string;
    link: string;
    description: string;
  };
  items: Array<{
    title: string;
    link: string;
    description: string;
    pubDate: string;
  }>;
};

export function createRSSObject(entries: ReadonlyArray<EntryValue>): RSSObject {
  const channel = {
    title: SITE_TITLE,
    link: SITE_URL,
    description: SITE_DESCRIPTION,
  };

  const items = entries.map(entry => {
    const link = `${SITE_URL}/${ENTRY_PATH}/${entry.slug}`;

    return {
      title: entry.title,
      description: entry.excerpt,
      pubDate: entry.createdAt,
      link,
    };
  });

  const r = {
    channel,
    items,
  };

  return r;
}
