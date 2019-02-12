import { EntryGateway, createEntryGateway } from './entryGateway';
import { EntryStore, createEntryStore } from './entryStore';

export class EntryContext {
  private _gateway: EntryGateway;
  private _store: EntryStore;

  constructor() {
    this._gateway = createEntryGateway();
    this._store = createEntryStore();
  }

  get gateway(): EntryGateway {
    return this._gateway;
  }

  get store(): EntryStore {
    return this._store;
  }
}

export const entryContext = new EntryContext();
