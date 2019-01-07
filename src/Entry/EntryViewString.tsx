import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { EntryValue } from '../entryValue';
import { EntryComponent } from './EntryComponent';

export function EntryViewString(entry: EntryValue): string {
  return renderToString(<EntryComponent entry={entry} />);
}
