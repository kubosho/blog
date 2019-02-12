import { Request, Response } from 'express';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Undefinable } from 'option-t/lib/Undefinable/Undefinable';

import { FoundationComponent } from '../Application/FoundationComponent';
import { SITE_TITLE } from '../Application/constants';
import { EntryValue } from '../entryValue';
import { getEntries } from '../getEntries';
import { entryContext } from '../entryContext';
import { EntryComponent } from './EntryComponent';

interface EntryPageParams {
  slug: string;
}

export const EntryHandler = async (req: Request, res: Response) => {
  await getEntries(entryContext);

  const entries = entryContext.store.getEntries();

  const params: EntryPageParams = req.params;
  const entry: Undefinable<EntryValue> = entries.find(e => e.slug === params.slug);
  const title = `${entry.title} · ${SITE_TITLE}`;

  const component = (
    <FoundationComponent title={title}>
      <EntryComponent entry={entry} />
    </FoundationComponent>
  );

  renderToNodeStream(component).pipe(res);
};
