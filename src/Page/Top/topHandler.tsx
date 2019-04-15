import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { Root } from '../../Application/Root';
import { Head } from '../../Application/Head';
import { Body } from '../../Application/Body';
import { SITE_TITLE } from '../../Application/constants';
import { EntryValue } from '../../Entry/entryValue';
import { entryGateway } from '../../Entry/entryContext';
import { TopContainer } from './TopContainer';

export const TopHandler = async (): Promise<string> => {
  let entries: ReadonlyArray<EntryValue>;

  try {
    entries = await entryGateway.fetchAllEntries();
  } catch (err) {
    throw new Error(err);
  }

  const component = (
    <Root>
      <Head title={SITE_TITLE} />
      <Body>
        <TopContainer entries={entries} />
      </Body>
    </Root>
  );

  const r = renderToString(component);
  return r;
};
