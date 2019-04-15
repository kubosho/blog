import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Undefinable } from 'option-t/lib/Undefinable/Undefinable';
import { Context } from 'universal-router';

import { Root } from '../../Application/Root';
import { Head } from '../../Application/Head';
import { Body } from '../../Application/Body';
import { SITE_TITLE } from '../../Application/constants';
import { EntryValue } from '../../Entry/entryValue';
import { entryGateway } from '../../Entry/entryContext';
import { EntryComponent } from './EntryComponent';

interface EntryPageParams {
  slug: string;
}

export const EntryHandler = async (context: Context): Promise<string> => {
  let entries: ReadonlyArray<EntryValue>;

  try {
    entries = await entryGateway.fetchAllEntries();
  } catch (err) {
    throw new Error(err);
  }

  const params: EntryPageParams = context.params;
  const entry: Undefinable<EntryValue> = entries.find(e => e.slug === params.slug);
  const title = `${entry.title} · ${SITE_TITLE}`;
  const component = (
    <Root>
      <Head title={title} />
      <Body>
        <EntryComponent entry={entry} />
      </Body>
    </Root>
  );

  const r = renderToString(component);
  return r;
};
