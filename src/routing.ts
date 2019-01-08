import * as express from 'express';
import { Undefinable, isUndefined } from 'option-t/lib/Undefinable/Undefinable';

import { EntryValue } from './entryValue';
import { SITE_TITLE } from './Application/constants';
import { EntryViewString } from './Entry/EntryViewString';
import { TopViewString } from './Top/TopViewString';
import { View } from './View';

interface EntryPageParams {
  slug: string;
}

export async function route(app: express.Express, entries: EntryValue[]) {
  app.use('/assets', express.static(`${__dirname}/assets`));

  app.get('/', (req, res) => {
    const body = TopViewString(entries);

    res.send(
      View({
        body,
        title: SITE_TITLE,
      }),
    );
  });

  app.get('/entry/:slug', (req, res) => {
    const params: EntryPageParams = req.params;
    const entry: Undefinable<EntryValue> = entries.find(e => e.slug === params.slug);

    const body = EntryViewString(entry);

    if (!isUndefined(entry)) {
      res.send(
        View({
          body,
          title: `${entry.title} · ${SITE_TITLE}`,
        }),
      );
    }
  });
}
