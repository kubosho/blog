import { Nullable, isNotNull } from 'option-t/lib/Nullable/Nullable';
import { ContentfulClientApi, EntryCollection } from 'contentful';

import { Memoization } from '../Application/memoization';
import { toEntryPlainObject, toEntryValue } from './entryResponseConverter';
import { ContentfulCustomEntryFields, EntryValue } from './entryValue';

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

    const valuesCache = this._memoize.get(res);

    if (isNotNull(valuesCache)) {
      return valuesCache;
    }

    const entryObjects = res.items.map(({ sys, fields }) => toEntryPlainObject(sys, fields));
    const values = entryObjects.map(toEntryValue);
    this._memoize.set(res, values);
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
