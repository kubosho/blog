import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { TopComponent } from './TopComponent';
import { EntryValue } from '../entryValue';

export function TopViewString(entries: EntryValue[]): string {
  return renderToString(<TopComponent entries={entries} />);
}
