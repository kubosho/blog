import { Nullable, isNull } from 'option-t/lib/Nullable/Nullable';
import { unwrapOrFromUndefinable } from 'option-t/lib/Undefinable/unwrapOr';
import { ContentfulClientApi, Entry, EntryCollection } from 'contentful';
// @ts-ignore
import { default as marked } from 'marked';

import { Memoization } from '../Application/memoization';
import { ContentfulCustomEntryFields, EntryPlainObject, EntryValue } from './entryValue';

type EntriesMemoization = Memoization<
  EntryCollection<ContentfulCustomEntryFields>,
  ReadonlyArray<EntryValue>
>;

export interface EntryGateway {
  fetchAllEntries(): Promise<Nullable<ReadonlyArray<EntryValue>>>;
}

class EntryGatewayImpl {
  private _client: ContentfulClientApi;
  private _memoize: EntriesMemoization;

  constructor(client: ContentfulClientApi, memoize: EntriesMemoization) {
    this._client = client;
    this._memoize = memoize;
  }

  async fetchAllEntries(): Promise<Nullable<ReadonlyArray<EntryValue>>> {
    let res: EntryCollection<ContentfulCustomEntryFields> = null;

    try {
      res = await this._client.getEntries();
    } catch (err) {
      // tslint:disable-next-line no-console
      console.error(err);
      return;
    }

    let values = this._memoize.get(res);

    if (isNull(values)) {
      values = res.items.map(createEntryValue);
      this._memoize.set(res, values);
    }

    return values;
  }
}

export function createEntryGateway(
  client: ContentfulClientApi,
  memoize: EntriesMemoization,
): EntryGateway {
  const g = new EntryGatewayImpl(client, memoize);
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
