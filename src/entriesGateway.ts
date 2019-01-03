import { ContentfulClientApi, EntryCollection, createClient } from 'contentful';
import * as marked from 'marked';

import { EntryPlainObject, EntryValue } from './entryValue';

export function createContentfulClient(space: string, accessToken: string): ContentfulClientApi {
  const c = createClient({
    space,
    accessToken,
  });

  return c;
}

export async function fetchEntries(client: ContentfulClientApi): Promise<EntryValue[]> {
  const entries: EntryCollection<EntryPlainObject> = await client.getEntries();
  const result = entries.items.map(item => {
    const content = marked(item.fields.content);
    const o = {
      ...item.sys,
      ...item.fields,
      content,
    };
    const ev = new EntryValue(o);
    return ev;
  });

  return result;
}
