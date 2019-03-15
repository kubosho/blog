import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { FoundationContainer } from '../../Foundation/FoundationContainer';
import { SITE_TITLE } from '../../Application/constants';
import { EntryValue } from '../../Entry/entryValue';
import { entryGateway } from '../entryContext';
import { TopContainer } from './TopContainer';

export const TopHandler = async (): Promise<string> => {
  let entries: ReadonlyArray<EntryValue>;

  try {
    entries = await entryGateway.fetchAllEntries();
  } catch (err) {
    throw new Error(err);
  }

  const component = (
    <FoundationContainer title={SITE_TITLE}>
      <TopContainer entries={entries} />
    </FoundationContainer>
  );

  const r = renderToString(component);
  return r;
};
