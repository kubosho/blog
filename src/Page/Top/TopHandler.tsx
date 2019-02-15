import { Request, Response } from 'express';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';

import { FoundationComponent } from '../../Application/FoundationComponent';
import { SITE_TITLE } from '../../Application/constants';
import { getEntries } from '../getEntries';
import { entryContext } from '../entryContext';
import { TopComponent } from './TopComponent';

export const TopHandler = async (_req: Request, res: Response) => {
  await getEntries(entryContext);

  const entries = entryContext.store.getEntries();

  const component = (
    <FoundationComponent title={SITE_TITLE}>
      <TopComponent entries={entries} />
    </FoundationComponent>
  );

  renderToNodeStream(component).pipe(res);
};
