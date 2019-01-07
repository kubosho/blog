import { ContentfulClientApi } from 'contentful';
import * as express from 'express';
import { Nullable } from 'option-t/lib/Nullable/Nullable';

import { EntryValue } from './entryValue';
import { SITE_TITLE } from './Application/constants';
import { TopViewString } from './Top/TopViewString';
import { View } from './View';
import { fetchEntries } from './entriesGateway';

export async function route(app: express.Express, client: ContentfulClientApi) {
  app.use('/assets', express.static(`${__dirname}/assets`));

  let entries: Nullable<EntryValue[]> = null;
  try {
    entries = await fetchEntries(client);
  } catch (err) {
    throw new Error(err);
  }

  app.get('/', (req, res) => {
    const body = TopViewString(entries);

    res.send(
      View({
        body,
        title: SITE_TITLE,
      }),
    );
  });
}
