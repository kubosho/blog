import * as express from 'express';
import { Undefinable, isUndefined } from 'option-t/lib/Undefinable/Undefinable';

import { SITE_TITLE } from '../Application/constants';
import { ENTRY_PATH } from '../Application/paths';
import { View } from '../View';
import { EntryValue } from '../entryValue';
import { EntryViewString } from './EntryViewString';

interface EntryPageParams {
  slug: string;
}

export function entryRouteHander(app: express.Express, entries: EntryValue[]) {
  app.get(ENTRY_PATH, (req, res) => {
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
