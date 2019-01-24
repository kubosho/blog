import { Nullable } from 'option-t/lib/Nullable/Nullable';
import { EntryValue } from './entryValue';

export class EntryStore {
  private _entries: Nullable<EntryValue[]>;

  constructor() {
    this._entries = null;
  }

  getEntries(): Nullable<EntryValue[]> {
    return this._entries;
  }

  setEntries(entries: EntryValue[]) {
    this._entries = entries;
  }
}

export function createEntryStore(): EntryStore {
  const s = new EntryStore();
  return s;
}
