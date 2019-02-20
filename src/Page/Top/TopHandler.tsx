import { Request, Response } from 'express';
import * as React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createOk, createErr } from 'option-t/lib/PlainResult/Result';

import { FoundationComponent } from '../../Application/FoundationComponent';
import { SITE_TITLE } from '../../Application/constants';
import { EntryValue } from '../../Entry/entryValue';
import { createEntryGateway } from '../../Entry/entryGateway';
import { appStore } from '../../appStore';
import { addEntries } from './topAction';
import { TopContainer } from './TopContainer';

export const TopHandler = async (_req: Request, res: Response) => {
  const gateway = createEntryGateway();
  let entries: ReadonlyArray<EntryValue>;

  appStore.subscribe(() => {
    const component = (
      <Provider store={appStore}>
        <FoundationComponent title={SITE_TITLE}>
          <TopContainer />
        </FoundationComponent>
      </Provider>
    );

    renderToNodeStream(component).pipe(res);
  });

  try {
    entries = await gateway.fetchAllEntries();
    appStore.dispatch(addEntries(createOk(entries)));
  } catch (err) {
    const error = new Error(err);
    appStore.dispatch(addEntries(createErr(error)));
    return;
  }
};
