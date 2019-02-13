import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
import * as marked from 'marked';

import { createContentfulClient } from './contentfulClient';
import { ContentfulCustomEntryFields, EntryPlainObject, EntryValue } from './entryValue';

type EntriesCache = WeakMap<
  EntryCollection<ContentfulCustomEntryFields>,
  ReadonlyArray<EntryValue>
>;

export class EntryGateway {
  private _entriesCache: EntriesCache;
  private _client: ContentfulClientApi;

  constructor(client: ContentfulClientApi, entriesCache: EntriesCache) {
    this._entriesCache = entriesCache;
    this._client = client;
  }

  async fetchAllEntries(): Promise<ReadonlyArray<EntryValue>> {
    let res: EntryCollection<ContentfulCustomEntryFields> = null;

    try {
      res = await this._client.getEntries();
    } catch (err) {
      // tslint:disable-next-line no-console
      console.error(err);
      return;
    }

    if (this._entriesCache.has(res)) {
      return this._entriesCache.get(res);
    }

    const values = res.items.map(createEntryValue);
    this._entriesCache.set(res, values);

    return values;
  }
}

export function createEntryGateway(): EntryGateway {
  const client = createContentfulClient(process.env.SPACE, process.env.ACCESS_TOKEN);
  const cache = new WeakMap();
  const g = new EntryGateway(client, cache);
  return g;
}

function createEntryValue(item: Entry<ContentfulCustomEntryFields>): EntryValue {
  const { sys, fields } = item;

  const content = marked(fields.content);
  const createdAt = unwrapOrFromUndefinable(fields.publishedAt, sys.createdAt);
  const excerpt = createExcerptText(fields);

  const o: EntryPlainObject = {
    ...sys,
    ...fields,
    content,
    createdAt,
    excerpt,
  };
  const v = new EntryValue(o);

  return v;
}

function createExcerptText(fields: ContentfulCustomEntryFields): string {
  const excerpt = fields.excerpt;
  const contentExcerpt = stripParagraphElement(marked(fields.content.split('\n')[0]));

  const r = unwrapOrFromUndefinable(excerpt, contentExcerpt);
  return r;
}

function stripParagraphElement(content: string): string {
  return content.replace(/<\/?p>/g, '');
}
