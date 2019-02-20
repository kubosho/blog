import { Reducer } from 'redux';
import { mapOrElseForResult } from 'option-t/lib/PlainResult/mapOrElse';

import { ADD_ENTRIES } from '../../Application/actionType';
import { EntriesObject } from '../../Entry/entryType';
import { AddEntriesAction } from './topAction';

export type TopReducer = Reducer<EntriesObject, AddEntriesAction>;

export const topReducer: TopReducer = (state, action) => {
  switch (action.type) {
    default:
      return null;
    case ADD_ENTRIES:
      const result = mapOrElseForResult(
        action.payload,
        _err => {
          const r1 = Object.assign({}, state, {
            entries: [],
          });
          return r1;
        },
        val => {
          const r2 = Object.assign({}, state, {
            entries: val,
          });
          return r2;
        },
      );
      return result;
  }
};
