import { Action } from 'redux';
import { Result } from 'option-t/lib/PlainResult/Result';

import { ADD_ENTRIES } from '../../Application/actionType';
import { Entries } from '../../Entry/entryType';

export interface AddEntriesAction extends Action {
  type: typeof ADD_ENTRIES;
  payload: Result<Entries, Error>;
}

export function addEntries(entries: Result<Entries, Error>): AddEntriesAction {
  return {
    type: ADD_ENTRIES,
    payload: entries,
  };
}
