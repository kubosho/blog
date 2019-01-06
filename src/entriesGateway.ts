import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import { ContentfulClientApi, EntryCollection, createClient } from 'contentful';
import * as marked from 'marked';

import { EntryPlainObject, EntryValue } from './entryValue';

function createExcerptText(fields: EntryPlainObject): string {
  const excerpt = fields.excerpt;
  const contentExcerpt = stripParagraphElement(marked(fields.content.split('\n')[0]));

  const r = unwrapOrFromUndefinable(excerpt, contentExcerpt);
  return r;
}

function stripParagraphElement(content: string): string {
  return content.replace(/<\/?p>/g, '');
}

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
    const excerpt = createExcerptText(item.fields);

    const o = {
      ...item.sys,
      ...item.fields,
      content,
      excerpt,
    };
    const ev = new EntryValue(o);
    return ev;
  });

  return result;
}
