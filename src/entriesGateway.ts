import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import { ContentfulClientApi, EntryCollection } from 'contentful';
import * as marked from 'marked';

import { EntryPlainObject, EntryValue } from './entryValue';

export class EntriesGateway {
  private _client: ContentfulClientApi;

  constructor(client: ContentfulClientApi) {
    this._client = client;
  }

  async fetch(): Promise<EntryValue[]> {
    const entries: EntryCollection<EntryPlainObject> = await this._client.getEntries();
    const r = entries.items.map(item => {
      const content = marked(item.fields.content);
      const createdAt = unwrapOrFromUndefinable(item.fields.publishedAt, item.fields.createdAt);
      const excerpt = createExcerptText(item.fields);

      const o = {
        ...item.sys,
        ...item.fields,
        content,
        createdAt,
        excerpt,
      };
      const ev = new EntryValue(o);
      return ev;
    });

    return r;
  }
}

function createExcerptText(fields: EntryPlainObject): string {
  const excerpt = fields.excerpt;
  const contentExcerpt = stripParagraphElement(marked(fields.content.split('\n')[0]));

  const r = unwrapOrFromUndefinable(excerpt, contentExcerpt);
  return r;
}

function stripParagraphElement(content: string): string {
  return content.replace(/<\/?p>/g, '');
}
