import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { EntryValue } from '../entryValue';
import { TopComponent } from './TopComponent';

export function TopViewString(entries: EntryValue[]): string {
  return renderToString(<TopComponent entries={entries} />);
}
